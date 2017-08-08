"use strict";

document.addEventListener('DOMContentLoaded', function () {
    fetch("https://unpkg.com/world-atlas@1/world/50m.json").then(function (response) {
        if (response.status !== 200) {
            console.log("There was a problem: " + response.status);
            return;
        }
        response.json().then(function (worlddata) {
            console.log(worlddata);
        });
    });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsbC5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsInN0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCJqc29uIiwid29ybGRkYXRhIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxTQUFTQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNoREMsVUFBTSxnREFBTixFQUNLQyxJQURMLENBQ1Usb0JBQVk7QUFDZCxZQUFJQyxTQUFTQyxNQUFULEtBQW9CLEdBQXhCLEVBQTZCO0FBQ3pCQyxvQkFBUUMsR0FBUiwyQkFBb0NILFNBQVNDLE1BQTdDO0FBQ0E7QUFDSDtBQUNERCxpQkFBU0ksSUFBVCxHQUFnQkwsSUFBaEIsQ0FBcUIscUJBQWE7QUFDOUJHLG9CQUFRQyxHQUFSLENBQVlFLFNBQVo7QUFDSCxTQUZEO0FBR0gsS0FUTDtBQVVILENBWEQiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGZldGNoKFwiaHR0cHM6Ly91bnBrZy5jb20vd29ybGQtYXRsYXNAMS93b3JsZC81MG0uanNvblwiKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhlcmUgd2FzIGEgcHJvYmxlbTogJHtyZXNwb25zZS5zdGF0dXN9YCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4od29ybGRkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmxkZGF0YSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxufSk7Il19
