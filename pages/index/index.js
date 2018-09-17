
import upng from '../../utils/UPNG';

Page({
  data: {},

  onLoad() {},
  upload() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const img = res.tempFilePaths[0];
        const canvas = wx.createCanvasContext('firstCanvas');
        canvas.drawImage(img, 0, 0, 150, 150);
        canvas.draw(false, () => {
          wx.canvasGetImageData({
            canvasId: 'firstCanvas',
            x: 0,
            y: 0,
            width: 150,
            height: 150,
            success(bs) {
              const pngData = upng.encode([bs.data.buffer], bs.width, bs.height);
              const base64 = wx.arrayBufferToBase64(pngData);
              console.log(base64);
            },
          });
        });
      },
    });
  },

});
