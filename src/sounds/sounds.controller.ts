import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { SoundsService } from '@/sounds/sounds.service';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { UploadService } from '@/upload/upload.service';
import { CreateSoundDto } from '@/sounds/dtos/create-sound.dto';
import { FileDoesNotExistException } from '@/exceptions/file-does-not-exist.exception';
import { FileType } from '@/upload/enums/file-type.enum';
import { UpdateSoundDto } from '@/sounds/dtos/update-sound.dto';
import { SoundExistsValidationPipe } from '@/sounds/validation-pipes/sound-exists.validation-pipe';
import { Sound } from '@/sounds/interfaces/sound.interface';
import { CanUpdateSoundValidationPipe } from '@/sounds/validation-pipes/can-update-sound.validation-pipe';
import { TwitchApiService } from '@/twitch-api/twitch-api.service';
import { UserDoesntHaveRewardException } from '@/sounds/exceptions/user-doesnt-have-reward.exception';

@Controller('sounds')
export class SoundsController {
  constructor(
    private soundsService: SoundsService,
    private uploadService: UploadService,
    private twitchApiService: TwitchApiService,
  ) {
  }

  @Get()
  @UseGuards(JwtGuard)
  get(@Req() request) {
    return this.soundsService.getByUserId(request.user.id);
  }

  @Post()
  @UseGuards(JwtGuard)
  async create(@Req() request, @Body() createSoundDto: CreateSoundDto) {
    const file = await this.uploadService.getByName(createSoundDto.file);

    if (!file) throw new FileDoesNotExistException();
    if (file.type !== FileType.TEMP || file.user.id !== request.user.id) throw new FileDoesNotExistException();

    await this.uploadService.changeType(file.id, FileType.SOUND);
    const sound = await this.soundsService.create({
      name: createSoundDto.name,
      user: { id: request.user.id },
      file: { id: file.id },
    });

    return this.soundsService.get(sound.id);
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  async update(
    @Req() request,
    @Body() updateSoundDto: UpdateSoundDto,
    @Param('id', SoundExistsValidationPipe, CanUpdateSoundValidationPipe) sound: Sound,
  ) {
    if (updateSoundDto.rewardId !== null) {
      const channelPointsRewards = await this.twitchApiService.getChannelPointsRewards(request.user.id, request.user.providerId);
      if (!channelPointsRewards.find(ele => ele.id === updateSoundDto.rewardId)) throw new UserDoesntHaveRewardException();
    }

    await this.soundsService.update({ id: sound.id, name: updateSoundDto.name, rewardId: updateSoundDto.rewardId });

    return this.soundsService.get(sound.id);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async delete(
    @Req() request,
    @Param('id', SoundExistsValidationPipe, CanUpdateSoundValidationPipe) sound: Sound,
  ) {
    await this.soundsService.delete(sound.id);
  }
}