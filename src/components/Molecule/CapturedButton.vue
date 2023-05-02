<template>
  <ControlButton
    v-if="props.recorder_blob_url"
    label_name="RESET"
    @ignition_function="captured_video_reset()"
  />
  <ControlButton
    v-else-if="props.video_is_recording"
    label_name="STOP"
    @ignition_function="stop_recording()"
  />
  <ControlButton
    v-else
    label_name="Start"
    @ignition_function="start_recording()"
  />
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from "vue";
  import ControlButton from "@/components/Atoms/ControlButton.vue";

  const props = defineProps({
    video_is_recording: Boolean,
    recorder_blob_url: String,
  });
  interface Emits {
    // 関数名, 引数の型, 返り値の型
    (function_name: string, argument_name: null): void;
  }
  const emits = defineEmits<Emits>();

  const captured_video_reset = () => {
    emits("captured_video_reset", null);
  };
  const stop_recording = () => {
    emits("stop_recording", null);
  };
  const start_recording = () => {
    emits("start_recording", null);
  };
</script>
