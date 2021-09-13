import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { store } from '../store';
import { eventbus } from './event-bus';

export const FilePond = vueFilePond(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

export const filePondServerSettings = {
  url: "/upload",
  process: {
    headers: (file, metadata) => {
      return {
        'Upload-Length': file.size,
        'Authorization': `Bearer ${store.auth.token}`
      }
    },
    onerror: (err) => {
      try {
        err = JSON.parse(err);
        eventbus.$emit('global-error:modal:show', err.message)
      } catch  {
        eventbus.$emit('global-error:modal:show', 'Wystąpił nieoczekiwany błąd, spróbuj ponownie później.')
      }

      return false;
    }
  }
}