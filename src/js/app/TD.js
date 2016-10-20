//"use strict";

var TD = {};

//美林版ajax对应接口
TD.ajax = function(pm, succback, errorback){
	$.ajax({
		type: pm.type || 'GET',
		url: pm.url,
		dataType: 'json',
		data: pm.data || '',
		success: function(data){
			if (data.status == 1) {
				succback && succback(data.data);
			}else {
				errorback && errorback(data.message);
			}
		},
		error: function(xhr, status, thrown){
			errorback && errorback('网络连接不稳定，请重试或刷新页面！');
		}
	});
};

/*data参数说明
data = {
	title: string, 朋友圈标题，给朋友的描述
	desc: string, 给朋友的标题
	link: string, 链接
	img: string, 图标
	track: string, 分享数据上报地址,post {btn:'1'}朋友或{btn:'2'}朋友圈
}
*/
TD.wxShare = function(data, callback){
	wx.onMenuShareTimeline({
		title: data.title, // 分享标题
		link: data.link, // 分享链接
		imgUrl: data.img, // 分享图标
		success: function () {
			callback && callback();
			//上报朋友圈
			TD.ajax({
				url: 'http://click.treedom.cn/log',
				type: 'POST',
				data: {
					key: 'wechat',
                    val: 'timeline',
                    pro: data.proj
				}
			}, function(data){
				console.log(data);
			}, function(msg){
                console.log(msg);
            });

            _czc && _czc.push(['_trackEvent', '分享', "朋友圈"]);
		},
		cancel: function () {
			// 用户取消分享后执行的回调函数
		}
	});
	wx.onMenuShareAppMessage({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接
        imgUrl: data.img, // 分享图标
        success: function () {
            callback && callback();
            //上报朋友
            TD.ajax({
                url: 'http://click.treedom.cn/log',
                type: 'POST',
                data: {
                    key: 'wechat',
                    val: 'message',
                    pro: data.proj
                }
            }, function(data){

            }, function(msg){
                console.log(msg);
            });

            _czc && _czc.push(['_trackEvent', '分享', "好友"]);
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
};

//初始化微信接口
//注意，与微信标准data相比，这里多了data.share属性，对应的是初始化页面时有默认的分享数据
TD.initWxApi = function(shareData, errback, succback){
	//服务器获取验证信息
	TD.ajax({
		url: 'http://click.treedom.cn/wx/signature',
		type: 'POST',
		data: {
			appid: shareData.appid,
        	url:  encodeURIComponent(shareData.link)
		}
	}, function(data){
		wx.config({
			debug: false,
			appId: data.appId,
			timestamp: data.timestamp,
			nonceStr: data.nonceStr,
			signature: data.signature,
			jsApiList: [
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'startRecord',
				'stopRecord',
				'onVoiceRecordEnd',
				'playVoice',
				'pauseVoice',
				'stopVoice',
				'onVoicePlayEnd',
				'uploadVoice',
				'downloadVoice',
				'chooseImage',
				'previewImage',
				'uploadImage',
				'downloadImage',
				'getNetworkType'
			]
		});
		wx.ready(function(){
			TD.wxShare(shareData);
			wx.getNetworkType({
	            success: function (res) {
	                var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
	                _czc && _czc.push(['_trackEvent', networkType, '网络类型']);
	            }
	        });
		});
	},function(err){
		console.log(err);
	});
	
};

//元素基于屏幕自适应缩放，dom上有data-response属性的元素都会受它影响
/*
config = {
	width: 375,
	height: 600,
	type: 'cover' // 'contain'
}
*/
TD.responseBody = function(config) {
	config = config || {};
	config.width = config.width || 375;
	config.height = config.height || 600;
	config.type = config.type || 'cover'; //'cover'、'contain'

	var responseList = $('[data-response]');

	var rate;

	var responseFn = function(){
		var rateX = window.innerWidth / config.width;
		var rateY = window.innerHeight / config.height;

		switch (config.type) {
			case 'cover':
				rate = rateX > rateY ? rateX : rateY;
				break;
			case 'contain':
				rate = rateX < rateY ? rateX : rateY;
				break;
			default:
				rate = 1;
		}

		responseList.each(function(i){
			this.style.webkitTransform = 'scale(' + rate + ')';
		});
	};

	responseFn();

	$(window).on('resize', function(){
		responseFn();
	});

	return rate;
}

//提示竖屏函数
TD.portraitTips = function(el) {
	var portraitFloat = (typeof el === 'string') ? $(el) : el ;

	var orientHandler = function(){
		if(window.orientation == 90|| window.orientation == -90){
			portraitFloat.show();
		} else {
			portraitFloat.hide();
		}
	};
	orientHandler();

	$(window).on('resize', function(){
		orientHandler();
	});
};

TD.getQuery = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) return (r[2]); return null;
}

module.exports = TD;
