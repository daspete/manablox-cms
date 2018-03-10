import Vue from 'vue'

import MediaGallery from '~/components/media/MediaGallery'
import MediaGalleryButton from '~/components/media/MediaGalleryButton'
import MediaGallerySelectionPreview from '~/components/media/MediaGallerySelectionPreview'
import UploadButton from '~/components/media/UploadButton'

Vue.component('media-gallery', MediaGallery)
Vue.component('media-gallery-button', MediaGalleryButton)
Vue.component('media-gallery-selection-preview', MediaGallerySelectionPreview)
Vue.component('upload-button', UploadButton)
