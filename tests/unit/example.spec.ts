import { shallowMount } from "@vue/test-utils";
// import HelloWorld from "@/components/HelloWorld.vue";
// import CapturedVideo from "@/views/CapturedVideo.vue";
import ControlButton from "@/components/Atoms/ControlButton.vue";

describe("ControlButton.vue", () => {
  it("ボタンラベルが正しく表示されている", () => {
    const label_name = "START";
    const wrapper = shallowMount(ControlButton, {
      props: { label_name },
    });
    expect(wrapper.text()).toMatch(label_name);
    // "RESET" || "STOP" || "START"
  });
  // 、ボタンをクリックすると関数が起動する
});

// CapturedVideo
// describe("CapturedVideo.vue", () => {
//   it("ページを開いたら、カメラ出力を表示する", () => {
//     const msg = "new message";
//     const wrapper = shallowMount(CapturedVideo, {
//       props: { msg },
//     });
//     expect(wrapper.text()).toMatch(msg);
//   });
// });
