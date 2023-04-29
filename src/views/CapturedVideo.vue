<template>
  <div v-if="media_recorder">
    <button v-if="recorder_blob_url" @click="captured_video_reset()">
      RESET
    </button>
    <button v-else-if="video_is_recording" @click="media_recorder.stop()">
      STOP
    </button>
    <button v-else @click="media_recorder.start()">Start</button>
    <!-- button -->
  </div>
  <video ref="video" muted playsinline autoplay v-show="!recorder_blob_url" />
  <!-- playsinline -->
  <video :src="recorder_blob_url" controls v-show="recorder_blob_url" />
</template>

<script setup lang="ts">
  import { onMounted, onBeforeMount, ref, reactive } from "vue";
  //data
  const media_recorder = ref();
  const video_is_recording = ref<boolean>(false);
  const recorder_blob_url = ref<string>();
  const camera_property = reactive({
    video: {
      facingMode: "environment",
      height: { min: 720, max: 1080 },
      width: { min: 1280, max: 1920 },
    },
    audio: false,
  });
  // life cycle
  onMounted(() => {
    camera_init();
  });
  //
  onBeforeMount(() => {
    if (!media_recorder.value || media_recorder.value?.stream) return;
    media_recorder.value?.stream.getTracks().forEach((track) => track.stop());
  });
  const captured_video_reset = () => {
    recorder_blob_url.value = undefined;
  };
  const camera_init = () => {
    navigator.mediaDevices
      .getUserMedia(camera_property)
      .then((media_stream) => {
        const [setting_track] = media_stream.getVideoTracks();
        console.log(setting_track.getSettings());
        captured_camera(media_stream);
        controls_camera(media_stream);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const captured_camera = (video_stream: MediaStream) => {
    const video = ref<HTMLVideoElement | null>(null);
    // video.value?.setAttribute("playsInline", true);

    if (video.value) {
      video.value.srcObject = video_stream;
      video.value.play();
    }
  };
  const controls_camera = (video_stream: MediaStream) => {
    const recorder_option = {
      mimeType: "video/webm; codecs=vp9", //webm
    };
    media_recorder.value = new MediaRecorder(video_stream, recorder_option);
    // media_recorder.value.isTypeSupported("video/webm");

    let captured_data: any = ref([]);
    media_recorder.value!.ondataavailable = (event) => {
      captured_data.value?.push(event.data);
    };
    media_recorder.value!.onstart = () => {
      captured_data.value = [];
      captured_video_reset();
      video_is_recording.value = true;
    };
    media_recorder.value!.onstop = () => {
      video_is_recording.value = false;
      const blob_options = { type: media_recorder.value.mimeType };
      // 録画物をrecordedに出力
      const recorder_blob = new Blob(captured_data.value, blob_options);
      recorder_blob_url.value = URL.createObjectURL(recorder_blob);
    };
  };
</script>

<style>
  video {
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
</style>
