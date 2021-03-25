<template>
  <main class="j_legal">
    <h2 class="legal_hd">
      法律声明
    </h2>

    <p>本网站使用网络跟踪器来改善用户体验及确保网站有效运行。</p>
    <p>本网络跟踪器说明是我们的隐私声明的组成部分。请查阅我们的隐私声明以了解更多关于我们的信息及我们如何保护访问者的信息。</p>
    <p>为向您提供个性化更佳、响应更快的服务，我们需要记忆和存储您如何使用本网站的信息。我们通过使用名为网络跟踪器的小文本文件来实现这一功能。网络跟踪器包含少量信息，通过网站服务器下载到您的电脑或其他设备上。其后您每次访问本网站时，您的网络浏览器会将这些网络跟踪器发回至本网站，以使本网站可以识别用户并记忆您的使用偏好等信息。您可以点击以下链接了解网络跟踪器及其工作原理的更多详细信: </p>
    <p>http://www.aboutcookies.org/。</p>
    <p>无论您何时使用本网站，信息都可通过网络跟踪器和其他技术被收集。如果您使用本网站，即表明您同意我们按本说明所述使用网络跟踪器。</p>
  </main>
</template>

<script>
export default {
  name: 'legal',

  head () {
    return {
      title: '法律声明 - 卓动科技'
    }
  },
}
</script>

<style lang="scss">
.j_legal {
  width: 80%;
  margin: 0 auto;
  // padding-bottom: px2rem(100px);
  padding-bottom: 60px;
  h2 {
    line-height: 1.2;
    margin: 1em 0;
    // font-size: px2rem(36px);
    font-size: 36px;
    font-weight: bold;
    color: #000;
  }

  p {
    margin: 1em 0;
    line-height: 1.5;
    // font-size: px2rem(20px);
    font-size: 20px;
    color: #666;
  }

  .legal_hd {
    text-align: center;
  }
}
</style>
