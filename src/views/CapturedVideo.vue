<template>
  <div>
    <video ref="video" muted v-show="!recorder_blob_url" />
    <!-- playsinline autoplay-->
    <video :src="recorder_blob_url" controls v-show="recorder_blob_url" />
  </div>
  <!-- button -->
  <div v-if="media_recorder">
    <CapturedButton
      :video_is_recording="video_is_recording"
      :recorder_blob_url="recorder_blob_url"
      @captured_video_reset="captured_video_reset()"
      @stop_recording="media_recorder.stop()"
      @start_recording="media_recorder.start()"
    />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onBeforeMount, ref, reactive } from "vue";
  import CapturedButton from "@/components/Molecule/CapturedButton.vue";
  //data
  const media_recorder = ref();
  const video_is_recording = ref<boolean>(false);
  const recorder_blob_url = ref<string>();
  const video = ref<HTMLVideoElement | undefined>();
  const camera_property = reactive<object>({
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
  onBeforeMount(() => {
    if (!media_recorder.value || media_recorder.value?.stream) return;
    media_recorder.value?.stream
      .getTracks()
      .forEach((track: { stop: () => any }) => track.stop());
  });
  //methods
  const camera_init = () => {
    navigator.mediaDevices
      .getUserMedia(camera_property)
      .then((media_stream) => {
        // test if the stream
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
    // video.value?.setAttribute("playsinline", true);
    // don't need to set srcObject, because it's already set in the video element
    video.value!.srcObject = video_stream;
    video.value!.play();
  };
  const controls_camera = (video_stream: MediaStream) => {
    const recorder_option = {
      mimeType: "video/webm; codecs=vp9", //webm
    };
    media_recorder.value = new MediaRecorder(video_stream, recorder_option);
    // media_recorder.value.isTypeSupported("video/webm");

    let captured_data: any = ref([]);
    media_recorder.value!.ondataavailable = (event: { data: any }) => {
      captured_data.value?.push(event.data);
      // console.log(event.data);
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
  const captured_video_reset = () => {
    recorder_blob_url.value = undefined;
  };
</script>

<style>
  video {
    object-fit: contain;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
</style>
