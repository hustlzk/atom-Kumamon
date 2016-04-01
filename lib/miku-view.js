var KumamonView;
var $ = require('jquery');

module.exports = KumamonView = ( function() {
    function KumamonView(serializedState) {
        this.randomId = Math.random().toString().split('.')[1];
        this.kumamon = null;
        /*
        * 创建超时空结界空间
        * */
        this.element = document.createElement('div');
        this.element.classList.add('mmdContainer');
        this.element.id = 'container_' + this.randomId;


        var iframe = document.createElement('iframe');
        iframe.src = 'http://115.159.57.220/Kumamon/' + '?num=' + Math.random;
        iframe.classList.add('mmdIframe');
        this.iframeName = 'iframe_' + this.randomId;
        iframe.id = this.iframeName;
        iframe.name = this.iframeName;
        this.element.appendChild(iframe);

        var loading = document.createElement('div');
        loading.classList.add('kumamon_loading');
        loading.id = 'loading_' + this.randomId;
        loading.innerHTML = 'loading...';
        this.element.appendChild(loading);

        var overlay = document.createElement('div');
        overlay.classList.add('mmdOverlay');
        overlay.id = 'overlay_' + this.randomId;

        //按钮组
        var btnGroup = document.createElement('div');
        btnGroup.classList.add('btnGroup');
        btnGroup.id = 'btnGroup_' + this.randomId;

        //静音
        var mute = document.createElement('div');
        mute.classList.add('kumamon_mute');
        mute.classList.add('kumamon_btn');
        mute.id = 'mute_' + this.randomId;
        mute.innerHTML = '静音';
        mute.setAttribute('name', 'mute');
        this.muteBtn = $('#' + mute.id);
        btnGroup.appendChild(mute);


        //恒定音乐
        var constantMusic = document.createElement('div');
        constantMusic.classList.add('kumamon_constantMusic');
        constantMusic.classList.add('kumamon_btn');
        constantMusic.id = 'constantMusic' + this.randomId;
        constantMusic.setAttribute('name', 'music');
        constantMusic.innerHTML = '音乐模式';
        this.musicBtn = $('#' + constantMusic.id);
        btnGroup.appendChild(constantMusic);

        //恒定舞蹈
        var constantDance = document.createElement('div');
        constantDance.classList.add('kumamon_constantDance');
        constantDance.classList.add('kumamon_btn');
        constantDance.id = 'constantDance_' + this.randomId;
        constantDance.innerHTML = '卖萌模式';
        constantDance.setAttribute('name', 'dance');
        this.danceBtn = $('#' + constantDance.id);
          btnGroup.appendChild(constantDance);

        //萌妹模式
        var girlmodle = document.createElement("div");
        girlmodle.classList.add('kumamon_girl');
        girlmodle.classList.add('kumamon_btn');
        girlmodle.id = 'girlmodle' + this.randomId;
        girlmodle.setAttribute('name','change');
        girlmodle.innerHTML = '随机萌妹';
        this.girlbtn = $('#' + girlmodle.id);
        btnGroup.appendChild(girlmodle);

        overlay.appendChild(btnGroup);
        this.element.appendChild(overlay);
    }

    KumamonView.prototype.serialize = function() {};

    KumamonView.prototype.destroy = function() {

        return this.element.remove();
    };

    KumamonView.prototype.getElement = function() {
        return this.element;
    };
    KumamonView.prototype.setCount = function(count) {
        var displayText;
        displayText = "There are " + count + " words.";
        return this.element.children[0].textContent = displayText;
    };
    KumamonView.prototype.initEventBind = function() {
        var that = this;
        that.iframe = $('#' + that.iframeName);
        that.container = $('#container_' + that.randomId);
        that.btnGroup = $('#btnGroup_' + that.randomId);
        that.overlay = $('#overlay_' + that.randomId);
        that.loading = $('#loading_' + that.randomId);
        that.iframe.load(function() {
            that.loading.css({
                display: 'none'
            });

        });
        $(document).mousemove(function(e) {
            if (!!this.move) {
                var posix = !document.move_target ? {
                        'x': 0,
                        'y': 0
                    } : document.move_target.posix,
                    callback = document.call_down || function() {
                            $(this.move_target).css({
                                'top': e.pageY - posix.y,
                                'left': e.pageX - posix.x
                            });
                        };

                callback.call(this, e, posix);
            }
        }).mouseup(function(e) {
            if (!!this.move) {
                var callback = document.call_up || function() {};
                callback.call(this, e);
                $.extend(this, {
                    'move': false,
                    'move_target': null,
                    'call_down': false,
                    'call_up': false
                });
            }
        });

        /*
        * 绑定时空转移事件
        * */
        that.container.mousedown(function(e) {
            console.log('mousedown');
            var offset = $(this).offset();
            this.posix = {
                'x': e.pageX - offset.left,
                'y': e.pageY - offset.top
            };
            $.extend(document, {
                'move': true,
                'move_target': this
            });
        });
        /*
        * TODO 缩放支持
        * */

        that.overlay.hover(function() {
            if (that.loading.is(':hidden')) {
                that.btnGroup.css({
                    display: 'block'
                });

            }
        }, function() {
            that.btnGroup.css({
                display: 'none'
            });
        });
        $('.kumamon_btn').click(function() {
            var elem = $(this);
            var name = elem.attr('name');
            console.log(name);
            if (elem.hasClass('kumamon_active')) {
                elem.removeClass('kumamon_active');
                that[name](false);
            } else {
                elem.addClass('kumamon_active');
                that[name](true);
            }
        });
    };
    /*
    * 增加帧数
    * */
    KumamonView.prototype.addFrame = function(s) {
        if (this.kumamon && this.kumamon.control) {
            this.kumamon.control.addFrame(s);
        }
    };
    KumamonView.prototype.bugappear = function(bugs) {
        if (this.kumamon && this.kumamon.control) {
            this.kumamon.control.bugappear(bugs);
        }
    };
    KumamonView.prototype.change = function(){
      if (this.kumamon && this.kumamon.control){
        this.kumamon.control.change();
      }
    };
    KumamonView.prototype.play = function() {
        if (this.kumamon && this.kumamon.control) {
            this.kumamon.control.play();
        }
    };
    KumamonView.prototype.pause = function(flag) {
        if (this.kumamon && this.kumamon.control) {
            this.kumamon.control.pause(flag);
        }
    };
    KumamonView.prototype.mute = function(flag) {
        if (this.kumamon && this.kumamon.control) {
            this.kumamon.control.mute(flag);
        }
    };
    KumamonView.prototype.music = function(flag) {
        if (this.kumamon && this.kumamon.control) {
            this.kumamon.control.music(flag);
        }
    };
    KumamonView.prototype.dance = function(flag) {
        if (this.kumamon && this.kumamon.control) {
            this.kumamon.control.dance(flag);
        }
    };
    return KumamonView;

} )();
