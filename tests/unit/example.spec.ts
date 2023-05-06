import { shallowMount } from "@vue/test-utils";
// import CapturedButton from "@/components/Molecule/CapturedButton.vue";
import ControlButton from "@/components/Atoms/ControlButton.vue";
// mockとして扱われているファイルはダミーとして扱い、対象のファイルが無いとして扱う
// jest.mock("@/components/Molecule/CapturedButton.vue");

describe("ControlButton.vue", () => {
  // beforeEach(() => {
  //   jest.resetAllMocks();
  // });
  it("ボタンラベルが正しく表示されている", () => {
    const label_name = "START";
    const wrapper = shallowMount(ControlButton, {
      props: { label_name },
    });
    expect(wrapper.find("button").text()).toMatch(label_name);
  });
  it("ボタンをクリックするとignition_function関数が1回発生する", async () => {
    const wrapper = shallowMount(ControlButton);
    await wrapper.find("button").trigger("click");
    // function名が変わると、error
    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.emitted().click?.length).toBe(1);
  });

  // auto Mock
  // it("ボタンをクリックすると「何らかの重たい処理」が一回実行されること", async () => {
  //   const wrapper = shallowMount(ControlButton);
  //   await wrapper.find("button").trigger("click");
  //   expect(CapturedButton.captured_video_reset).toHaveBeenCalledTimes(1);
  // });
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
