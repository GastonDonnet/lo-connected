<template>
  <v-card raised="raised">
    <v-card-title>
      <span>{{ typeLabel }}</span>
    </v-card-title>
    <v-card-text>
      <v-file-input
        class="my-4"
        v-model="selectedFile"
        accept="image/png, image/jpeg"
        :label="typeLabel"
        placeholder="Seleccionar la imagen"
        :show-size="1024"
        @change="setupCropper"
        prepend-icon="mdi-camera"
      ></v-file-input>
      <v-row v-if="objectUrl">
        <v-col class="text-center" cols="12" sm="6">
          <div class="overline">Original</div>
          <div class="image-container elevation-4">
            <img class="image-preview" ref="source" :src="objectUrl" />
          </div>
          <div class="d-flex justify-center">
            <v-btn icon="icon" small="small" @click="resetCropper">
              <v-icon small="small">mdi-aspect-ratio</v-icon>
            </v-btn>
            <div class="mx-2"></div>
            <v-btn icon="icon" small="small" @click="rotateLeft">
              <v-icon small="small">mdi-rotate-left</v-icon>
            </v-btn>
            <v-btn icon="icon" small="small" @click="rotateRight">
              <v-icon small="small">mdi-rotate-right</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col class="text-center" cols="12" sm="6">
          <div class="overline">Preview</div>
          <div class="image-container elevation-4">
            <img class="image-preview" :src="previewCropped" />
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="!objectUrl" @click="submit()">
        <v-icon left="left">mdi-send</v-icon>Guardar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
import Cropper from 'cropperjs';
import debounce from 'lodash/debounce';

export default {
  props: {
    type: { required: true, type: String },
    typeLabel: { required: true, type: String },
    aspectRatio: { required: true, type: Number },
  },
  data() {
    return {
      cropper: null,
      objectUrl: null,
      previewCropped: null,
      selectedFile: null,
      debouncedUpdatePreview: debounce(this.updatePreview, 257),
    };
  },

  methods: {
    resetCropper() {
      this.cropper.reset();
    },
    rotateLeft() {
      this.cropper.rotate(-90);
    },
    rotateRight() {
      this.cropper.rotate(90);
    },
    setupCropper(selectedFile) {
      if (this.cropper) {
        this.cropper.destroy();
      }

      if (this.objectUrl) {
        window.URL.revokeObjectURL(this.objectUrl);
      }

      if (!selectedFile) {
        this.cropper = null;
        this.objectUrl = null;
        this.previewCropped = null;
        return;
      }

      this.objectUrl = window.URL.createObjectURL(selectedFile);
      this.$nextTick(this.setupCropperInstance);
    },
    setupCropperInstance() {
      this.cropper = new Cropper(this.$refs.source, {
        aspectRatio: this.aspectRatio,
        crop: this.debouncedUpdatePreview,
      });
    },
    updatePreview(event) {
      const canvas = this.cropper.getCroppedCanvas();
      this.previewCropped = canvas.toDataURL('image/png');
    },
    submit() {
      const canvas = this.cropper.getCroppedCanvas();
      if (canvas) {
        canvas.toBlob((blob) => {
          this.$emit('on-submit', blob, this.type);
        }, 'image/jpeg');
      }
    },
  },
};
</script>


<style  scoped>
.image-container {
  display: inline-block;
}

.image-preview {
  display: block;
  max-height: 229px;
  max-width: 100%;
}
</style>

<style lang="sass">
@import '~cropperjs/dist/cropper.css'
</style>
