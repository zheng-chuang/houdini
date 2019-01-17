### CSS Paint API简介了解一下

### 先举个🌰

![预览效果](https://raw.githubusercontent.com/zheng-chuang/houdini/master/ripple/ripple.gif)

### 再奉上[源码](https://github.com/zheng-chuang/houdini/tree/master/ripple)

![在线预览](https://zheng-chuang.github.io/houdini/ripple/index.html)

够诚意吧？那就开始搞起!!!

### 主要API

我们会用到两个api函数

- `registerPaint(name, paintCtor)`


- `CSS.paintWorklet.addModule(url: string)`


#### `registerPaint(name, paintCtor)`


看代码

```js
registerPaint('ripple', class {
  static get inputProperties() {
    return [
      'background-color',
      '--ripple-color',
      '--animation-tick',
      '--ripple-x',
      '--ripple-y'
    ];
  }
  paint(context, size, properties) {
    const backgroundColor = properties.get('background-color').toString();
    const rippleColor = properties.get('--ripple-color').toString();
    const rippleX = parseFloat(properties.get('--ripple-x').toString());
    const rippleY = parseFloat(properties.get('--ripple-y').toString());
    let animationTick = parseFloat(properties.get('--animation-tick').toString());
    if (animationTick < 0) {
      animationTick = 0;
    }
    if (animationTick > 1000) {
      animationTick = 1000;
    }

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, size.width, size.height);

    context.fillStyle = rippleColor;
    context.globalAlpha = 1 - animationTick / 1000;
    context.arc(rippleX, rippleY, size.width * animationTick / 1000, 0, 2 * Math.PI);
    context.fill();
  }
});
```

实在是没什么好讲的,两个函数 `static get inputProperties()`和`paint(context, size, properties)`;

`static get inputProperties()` 用来获取css属性(原生支持的还是你自己瞎写的都可以)

`paint(context, size, properties)` 就是用来画图的东西了

context其实就是canvas的画笔，size是包含你可以绘画的区域的宽度和高度，properties就是包含你在`static get inputProperties()`中要求获取的所有css变量了。

#### `CSS.paintWorklet.addModule(url: string)`

这玩意就更简单了, 将你定义的css module加进去就好了

```html
<script>
  if (window.CSS) {
    CSS.paintWorklet.addModule('paint.js')
  }
</script>
```

### 使用我们定义的css module

```html
<style>
    .container {
      background: #333;
      height: 700px;
      display: flex;
      align-items: center;
    }

    #ripple {
      font-size: 3em;
      font-weight: 200;
      --gradient: linear-gradient(to bottom right, deeppink, orangered);
      background: var(--gradient);
      border: 0;
      margin: 50px auto;
      padding: 1rem 2rem;
      box-shadow: 0 1px 1.5px 0 rgba(0, 0, 0, .12), 0 1px 1px 0 rgba(0, 0, 0, .24);
      color: #fff;
      border-radius: 5px;
      
    }

    #ripple:focus {
      outline: 0;
    }

    #ripple.animating {
      background: paint(ripple), var(--gradient);
      --ripple-x: 0;
      --ripple-y: 0;
      --animation-tick: 0;
      --ripple-color: rgba(255, 255, 255, 0.5);
    }
  </style>

  <script>
    const button = document.querySelector('#ripple');
    let timer;
    button.addEventListener('click', (evt) => {
      button.className = 'animating';
      const client = button.getBoundingClientRect();

      const x = evt.clientX - client.left;
      const y = evt.clientY - client.top;
      let tick = 0
      button.setAttribute('style', `--ripple-x: ${x}; --ripple-y: ${y}; --animation-tick: ${tick}`);
      if (timer) {
        clearInterval(timer)
      }
      timer = setInterval(() => {
        button.setAttribute('style', `--ripple-x: ${x}; --ripple-y: ${y}; --animation-tick: ${tick+=10}`);
        if (tick > 1000) {
          clearInterval(timer);
          button.className = '';
        }
      }, 10)
    })
  </script>

```

注意在`style`标签中`background: paint(ripple), var(--gradient);`这一句。

每次style的改变都会调用paint()然后绘制我们定义的ripple

### 想看更多?

[demo](https://css-houdini.rocks/)
