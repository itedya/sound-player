import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SoundEntity } from '@/sounds/entities/sound.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSound } from '@/sounds/interfaces/create-sound.interface';
import { UpdateSound } from '@/sounds/interfaces/update-sound.interface';

@Injectable()
export class SoundsService {

  constructor(
    @InjectRepository(SoundEntity)
    private soundsRepository: Repository<SoundEntity>,
  ) {
  }

  getByUserId(userId: string) {
    return this.soundsRepository.find({
      relations: ['user'],
      where: { user: { id: userId } },
    });
  }

  create(createSound: CreateSound) {
    return this.soundsRepository.save(createSound);
  }

  update(updateSound: UpdateSound) {
    return this.soundsRepository.save(updateSound);
  }

  get(id: string) {
    return this.soundsRepository.findOne({ relations: ['user', 'file'], where: { id } });
  }

  delete(id: string) {
    return this.soundsRepository.delete(id);
  }
}