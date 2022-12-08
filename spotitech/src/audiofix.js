document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener(
    "play",
    function (event) {
      let audio_elements = document.body.getElementsByTagName("audio");
      for (let i = 0; i < audio_elements.length; i++) {
        let audio_element = audio_elements[i];
        if (audio_element !== event.target) {
          audio_element.pause();
        }
      }
    },
    true
  );
});
