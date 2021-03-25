<template>
  <main class="t_contact">
    <j-banner need-animation>
      <template v-slot:default>
        {{$t('contact.title')}}
      </template>
      <template v-slot:info>
        {{$t('contact.subTitle')}}
      </template>
    </j-banner>

    <section class="contact_info">
      <article class="contact_item" need-animation>
        <h3 class="info_hd">{{$t('contact.contactWay')}}</h3>
        <p class="info_p">{{$t('contact.phone')}}：020-37362993</p>
        <!-- <p class="info_p">传真：020-37277813</p> -->
      </article>
      <article class="contact_item" need-animation>
        <h3 class="info_hd">{{$t('contact.wechat')}}</h3>
        <img src="/images/qrcode.jpg" class="contact_qrcode">
      </article>
      <article class="contact_item item3" need-animation>
        <h3 class="info_hd">{{$t('contact.email')}}</h3>
        <p class="info_p">{{$t('footer.employ')}}：<a href="mailto:hr@jodoinc.com" class="info_link">hr@jodoinc.com</a></p>
        <p class="info_p">{{$t('contact.game')}}：<a href="mailto:oversea@jodoinc.com" class="info_link">oversea@jodoinc.com</a></p>
        <p class="info_p">{{$t('contact.business')}}：<a href="mailto:bd@jodoinc.com" class="info_link">bd@jodoinc.com</a></p>
      </article>
    </section>

    <div class="contact_map_wrap">
      <h3 class="map_hd mobile" need-animation>{{$t('contact.address')}}</h3>
      <section class="contact_map">
        <article class="map_item" need-animation>
          <div class="map_container map_container1" id="map_container1"></div>
          <h3 class="map_hd pc">{{$t('contact.address')}}</h3>
          <p class="map_p">
            {{$t('contact.addressDetail1')}}
          </p>
          <div class="mobile_btns">
            <v-button 
              type="link"
              linkType="primary"
              href="https://map.baidu.com/poi/%E9%9B%85%E7%88%B5%E5%95%86%E5%8A%A1%E5%A4%A7%E5%8E%A6/@12621337.14,2630785.86,16.2z?uid=b38c42322a7727460a5cb3eb&ugc_type=3&ugc_ver=1&device_ratio=1&compat=1&querytype=detailConInfo&da_src=shareurl"
              target="_blank"
            >
              {{$t('contact.getAddress')}}
            </v-button>
          </div>
        </article>
        <article class="map_item" need-animation>
          <div class="map_container map_container2" id="map_container2"></div>
          <h3 class="map_hd pc">{{$t('contact.address')}}</h3>
          <p class="map_p">
            {{$t('contact.addressDetail2')}}
          </p>
          <div class="mobile_btns">
            <v-button
              type="link"
              linkType="primary"
              href="https://map.baidu.com/search/%E5%B0%8F%E8%B0%B7%E5%9B%B4%E8%A1%97%E9%81%93%E9%9D%92%E8%93%9D%E8%A1%9728%E5%8F%B7/@12623185.415,2622866.44,19z?querytype=s&da_src=shareurl&wd=%E5%B0%8F%E8%B0%B7%E5%9B%B4%E8%A1%97%E9%81%93%E9%9D%92%E8%93%9D%E8%A1%9728%E5%8F%B7&c=257&src=0&pn=0&sug=0&l=13&b=(12597933.116714465,2612100.9743966525;12648323.184097977,2636692.3770728773)&from=webmap&biz_forward=%7B%22scaler%22:1,%22styles%22:%22pl%22%7D&device_ratio=1"
              target="_blank"
            >
              {{$t('contact.getAddress')}}
            </v-button>
          </div>
        </article>
      </section>
    </div>
  </main>
</template>

<script>
// import Vue from 'vue';
import JBanner from '@/components/JBanner.vue';
import VButton from '@/components/Button.vue';
import { BounceInUp } from '@/util/animation';

import '@/assets/scss/animation.scss';

// 113.378167,23.129563

export default {
  name: 'contact',
  components: {
    JBanner,
    VButton,
  },

  head () {
    return {
      title: '联系我们 - 卓动科技'
    }
  },

  mounted () {
    BounceInUp.init();

    if (!window.bMapInit) {
      this.loadBMapScript();
      window['bMapInit'] = () => {
        this.createMap();
      };
    } else {
      this.createMap();
    }
  },

  beforeDestroy () {
    BounceInUp.destroy();
  },

  methods: {
    // 加载百度地图
    loadBMapScript () {
      let script = document.createElement("script");
      // E4805d16520de693a3fe707cdc962045
      script.src =
        "//api.map.baidu.com/api?v=2.0&ak=&callback=bMapInit";
      document.body.appendChild(script);
    },

    createMap () {
      // 雅爵商务大厦
      this.initMap('map_container1', 113.378167, 23.129563, {
        infoContent: '广州天河区软件园科韵路园区建中路59号雅爵商务大厦7楼',
        mapLink: 'https://map.baidu.com/poi/%E9%9B%85%E7%88%B5%E5%95%86%E5%8A%A1%E5%A4%A7%E5%8E%A6/@12621337.14,2630785.86,16.2z?uid=b38c42322a7727460a5cb3eb&ugc_type=3&ugc_ver=1&device_ratio=1&compat=1&querytype=detailConInfo&da_src=shareurl',
      });
      // 创智大厦
      this.initMap('map_container2', 113.394994, 23.06397, {
        infoContent: '广州市番禺区小谷围街青蓝街28号1栋1001室',
        mapLink: 'https://map.baidu.com/search/%E5%B0%8F%E8%B0%B7%E5%9B%B4%E8%A1%97%E9%81%93%E9%9D%92%E8%93%9D%E8%A1%9728%E5%8F%B7/@12623185.415,2622866.44,19z?querytype=s&da_src=shareurl&wd=%E5%B0%8F%E8%B0%B7%E5%9B%B4%E8%A1%97%E9%81%93%E9%9D%92%E8%93%9D%E8%A1%9728%E5%8F%B7&c=257&src=0&pn=0&sug=0&l=13&b=(12597933.116714465,2612100.9743966525;12648323.184097977,2636692.3770728773)&from=webmap&biz_forward=%7B%22scaler%22:1,%22styles%22:%22pl%22%7D&device_ratio=1'
      });
    },

    /**
     * 实例化百度地图
     * @param {string} mapId id
     * @param {number} longitude 经度
     * @param {number} latitude 纬度
     * @param {object} additionData 附加内容
     * @param {string} additionData.infoContent
     * @param {string} [additionData.mapLink]
     */
    initMap (mapId, longitude, latitude, additionData = {}) {
      if (!mapId || !longitude || !latitude) {
        return;
      }
      // 创建Map实例
      let map = new BMap.Map(mapId, { enableMapClick: false });

      let point = new BMap.Point(longitude, latitude);

      // 初始化地图,设置中心点坐标和地图级别
      map.centerAndZoom(point, 17);

      // 添加地图类型控件
      map.addControl(new BMap.MapTypeControl({
        mapTypes:[
          BMAP_NORMAL_MAP,
          // BMAP_HYBRID_MAP
        ]
      }));

      // 设置地图显示的城市 此项是必须设置的
      map.setCurrentCity("广州");
      // 开启鼠标滚轮缩放
      map.enableScrollWheelZoom(true);

      // 创建标注
      const marker = new BMap.Marker(point);
      const label = new BMap.Label("JODO", { "offset": new BMap.Size(-12, -26) });
      label.setStyle({
        borderColor: "#fff",
        color: "rgb(9, 125, 234)",
        cursor: "pointer",
        borderColor: '#808080',
        padding: '4px'
      });
      marker.setLabel(label);
      map.addOverlay(marker);  // 将标注添加到地图中 

      // 创建 info window
      this.createInfoWindow(marker, label, additionData);

      // 设置地图上的图标
      // let size = new BMap.Size(93, 42);
      // let icon = new BMap.Icon(mapIcon, size);
      //创建标注图标
      // let mk = new BMap.Marker(point, {
      //   icon: icon,
      //   offset: new BMap.Size(-5, -15)
      // });
      // // 将标注添加到地图中
      // map.addOverlay(mk);
    },

    /**
     * @param {object} additionData 附加内容
     * @param {string} additionData.infoContent
     * @param {string} additionData.mapLink
     */
    createInfoWindow (marker, label, additionData) {
      if (!marker || !additionData.infoContent) {
        return null;
      }

      let content = additionData.infoContent;
      if (additionData.mapLink) {
        content = `
          <a href="${additionData.mapLink}" target="_blank" title="点击打开地图">${additionData.infoContent}</a>
        `;
      }

      const infoWin = new BMap.InfoWindow("<b class='iw_poi_title' title='JODO'>" + "JODO" + "</b><div class='iw_poi_content'>" + content + "</div>");

      marker.addEventListener("click", function () {
        marker.openInfoWindow(infoWin);
      });
      infoWin.addEventListener("open", function () {
        marker.getLabel().hide();
      });
      infoWin.addEventListener("close", function () {
        marker.getLabel().show();
      });
      label && label.addEventListener("click", function () {
        marker.openInfoWindow(infoWin);
      });

      return infoWin;
    },
  },
};
</script>

<style lang="scss">
.t_contact {
  .contact_info {
    display: flex;
    justify-content: space-between;
    padding: px2rem(138px) px2rem(330px) px2rem(138px) px2rem(360px);
    background-color: #f7f7f7;

    .item3 {
      .info_p {
        padding-left: px2rem(35px);
      }
    }

    .info_hd {
      line-height: 1;
      margin-bottom: px2rem(55px);
      font-size: px2rem(30px);
      color: #111b28;
      text-align: center;
      text-transform: capitalize;
    }
    .info_p {
      line-height: 1.2;
      font-size: px2rem(20px);
      color: #242538;

      & + .info_p {
        margin-top: px2rem(6px);
      }
    }
    .info_link {
      color: #111b28;
      transition: color .3s;

      &:hover {
        text-decoration: underline;
        color: #555658;
      }
    }
    .contact_qrcode {
      display: block;
      @include setWH(179px, 179px);
      margin: 0 auto;
    }
  }

  .contact_map_wrap {
    .map_hd.mobile {
      display: none;
      text-transform: capitalize;
    }
  }
  .contact_map {
    display: flex;
    justify-content: space-between;
    padding: px2rem(132px) px2rem(175px) px2rem(90px);
    background-color: #fff;

    .map_item {
      width: px2rem(693px);
      text-align: center;
      color: #242538;
    }
    .map_container {
      height: px2rem(444px);
      background-color: #eee;
      font-size: 0;

      .BMap_cpyCtrl, .anchorBL {
        display: none;
      }

      .BMap_noprint.anchorTR {
        display: none;
      }

      .iw_poi_title {
        color: #CC5522;
        font-size: 14px;
        font-weight: bold;
        overflow: hidden;
        padding-right: 13px;
        white-space: nowrap
      }

      .iw_poi_content {
        font: 12px arial, sans-serif;
        overflow: visible;
        padding-top: 4px;
        white-space: -moz-pre-wrap;
        word-wrap: break-word
      }
    }
    .map_hd {
      line-height: 1;
      margin: px2rem(76px) 0 px2rem(16px);
      font-size: px2rem(26px);
      text-transform: capitalize;
    }
    .map_p {
      line-height: 1.5;
      font-size: px2rem(20px);
    }
    .mobile_btns {
      display: none;
      .v_button {
        text-transform: capitalize;
      }
    }
  }
}

@media only screen and (max-width: 750px) {
  .t_contact {
    $design-width: 750px;
    @import '@/assets/scss/mixin.scss';

    display: flex;
    flex-direction: column;
    background-color: #f7f7f7;

    .contact_info {
      order: 2;
      padding: px2rem(30px) 0 px2rem(80px);
      justify-content: flex-start;
      flex-direction: column;
      text-align: center;

      .item3 {
        .info_p {
          padding-left: 0;
        }
      }

      .contact_item {
        & + .contact_item {
          margin-top: px2rem(60px);
        }
      }

      .info_hd {
        margin-bottom: px2rem(35px);
        font-size: px2rem(38px);
      }
      .info_p {
        font-size: px2rem(24px);

        & + .info_p {
          margin-top: px2rem(10px);
        }
      }
      .contact_qrcode {
        @include setWH(205px, 205px);
      }
    }

    .contact_map_wrap {
      order: 1;
      padding-top: px2rem(60px);

      .map_hd {
        &.mobile {
          display: block;
          margin-bottom: px2rem(50px);
          font-size: px2rem(38px);
          text-align: center;
        }
        &.pc {
          display: none;
        }
      }
    }
    .contact_map {
      padding: 0 px2rem(30px) px2rem(30px);
      flex-direction: column;
      background-color: unset;

      .map_item {
        width: auto;
      }
      .map_container {
        display: none;
      }
      .map_p {
        margin-bottom: px2rem(18px);
        font-size: px2rem(24px);
      }
      .mobile_btns {
        display: block;
        margin-bottom: px2rem(25px);
        font-size: 0;
        text-align: center;
      }
    }
  }
}
</style>
