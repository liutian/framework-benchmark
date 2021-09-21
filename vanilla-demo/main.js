(function () {
  const $ = document.body.querySelector.bind(document.body);
  const $ele = (tag, className, textContent) => {
    const ele = document.createElement(tag || 'div');
    if (className) {
      ele.className = className;
    }
    if (textContent) {
      ele.textContent = textContent;
    }
    return ele;
  }
  const maxLengthInput = $('#max-length-input');
  const runBtn = $('#run-btn');
  const unshiftBtn = $('#unshift-btn');
  const pushBtn = $('#push-btn');
  const shiftBtn = $('#shift-btn');
  const popBtn = $('#pop-btn');
  const targetIdInput = $('#target-id-input');
  const moveBtn = $('#move-btn');
  const changeBtn = $('#change-btn');
  const containerEle = $('#container');

  let maxLength = 30000;
  const list = [];

  main();

  function main() {
    bindEvent();
    maxLengthInput.value = maxLength;
  }

  function bindEvent() {
    runBtn.addEventListener('click', run);
    unshiftBtn.addEventListener('click', unshift);
    pushBtn.addEventListener('click', push);
    shiftBtn.addEventListener('click', shift);
    popBtn.addEventListener('click', pop);
    moveBtn.addEventListener('click', move);
    changeBtn.addEventListener('click', change);
    maxLengthInput.addEventListener('input', (e) => maxLength = parseInt(e.target.value));
    containerEle.addEventListener('click', (e) => {
      if (e.target._btnType === 'comment') {
        logger('toggle');
        const itemData = e.target.parentElement.parentElement._data;
        if (e.target._hidden || e.target._hidden === undefined) {

          const commentContainerEle = $ele('div', 'comment-container');

          const commentInputEle = $ele('input', 'comment-input');
          commentContainerEle.appendChild(commentInputEle);

          const newCommentBtn = $ele('button', null, 'ok');
          newCommentBtn._btnType = 'new-comment-btn';
          commentContainerEle.appendChild(newCommentBtn);

          const commentListEle = $ele('div', 'comment-list');
          itemData.commentList.forEach((comment) => {
            commentListEle.appendChild($ele('div', null, comment));
          });
          commentContainerEle.appendChild(commentListEle);

          e.target.parentElement.parentElement.appendChild(commentContainerEle);
          e.target._hidden = false;
        } else {
          e.target.parentElement.parentElement.lastElementChild.remove();
          e.target._hidden = true;
        }
      } else if (e.target._btnType === 'new-comment-btn') {
        logger('comment');
        const itemData = e.target.parentElement.parentElement._data;
        const newComment = e.target.previousElementSibling.value;
        e.target.nextElementSibling.appendChild($ele('div', null, newComment));
        e.target.previousElementSibling.value = '';
        itemData.commentList.push(newComment);
      } else if (e.target._btnType) {
        const type = e.target._btnType;
        logger(type);
        const itemData = e.target.parentElement.parentElement._data;
        const count = itemData[type] || 0;
        e.target.textContent = `${e.target._btnType} ${count + 1}`;
        itemData[type] = count + 1;
        e.stopPropagation();
      }
    });
  }

  function unshift() {
    logger('unshift');
    const item = createItem();
    list.unshift(item);
    const itemEle = createItemEle(item);
    containerEle.insertBefore(itemEle, containerEle.firstElementChild);
  }

  function push() {
    logger('push');
    const item = createItem();
    list.push(item);
    const itemEle = createItemEle(item);
    containerEle.appendChild(itemEle);
  }

  function shift() {
    logger('shift');
    list.shift();
    containerEle.firstElementChild.remove();
  }

  function pop() {
    logger('pop');
    list.pop();
    containerEle.lastElementChild.remove();
  }

  function move() {
    logger('move');
    const moveTargetId = +targetIdInput.value;
    const index = list.findIndex(item => item.id === moveTargetId);
    const [item] = list.splice(index, 1);
    list.unshift(item);
    const ele = containerEle.children.item(index);
    containerEle.insertBefore(ele, containerEle.children.item(0));
  }

  function change() {
    logger('change');
    const changeTargetId = +targetIdInput.value;
    const index = list.findIndex(item => item.id === changeTargetId);
    const item = createItem();
    list.splice(index, 1, item);

    const itemEle = createItemEle(item);
    const oldEle = containerEle.children.item(index);
    containerEle.insertBefore(itemEle, oldEle);
    oldEle.remove();
  }

  function run() {
    logger('run');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < maxLength; i++) {
      const item = createItem();
      list.push(item);
      const itemEle = createItemEle(item);
      fragment.appendChild(itemEle);
    }

    containerEle.appendChild(fragment);
  }

  function createItemEle(itemData) {
    const rootEle = $ele('div', 'item-block');
    rootEle._data = itemData;

    const authEle = $ele();
    authEle.textContent = `${itemData.author + itemData.id} :`;
    rootEle.appendChild(authEle);

    const contentEle = $ele();
    contentEle.textContent = itemData.content;
    rootEle.appendChild(contentEle);

    const btnActionEle = $ele();

    const favoriteBtn = $ele('button');
    favoriteBtn._btnType = 'favorite';
    favoriteBtn.appendChild(document.createTextNode('favorite'));
    btnActionEle.appendChild(favoriteBtn);

    const likeBtn = $ele('button');
    likeBtn._btnType = 'like';
    likeBtn.appendChild(document.createTextNode('like'));
    btnActionEle.appendChild(likeBtn);

    const forwardBtn = $ele('button');
    forwardBtn._btnType = 'forward';
    forwardBtn.appendChild(document.createTextNode('forward'));
    btnActionEle.appendChild(forwardBtn);

    const commentBtn = $ele('button');
    commentBtn._btnType = 'comment';
    commentBtn.appendChild(document.createTextNode('comment'));
    btnActionEle.appendChild(commentBtn);

    rootEle.appendChild(btnActionEle);
    return rootEle;
  }

  const createItem = function () {
    let uuid = 0;
    return () => {
      return {
        id: ++uuid,
        author: "xxx",
        content: "hello world " + uuid,
        comments: [],
        isShowComment: false,
        favorite: 0,
        like: 0,
        forward: 0,
        commentList: []
      };
    }
  }();

  const logger = (sign) => {
    const startTime = performance.now();
    let scriptTime;

    Promise.resolve().then(promiseFn);

    setTimeout(timeoutFn);

    function promiseFn() {
      scriptTime = performance.now() - startTime;
      console.log(`${sign}[script]: ${scriptTime}ms`);
      longTask();
    }

    function timeoutFn() {
      const nowTime = performance.now();
      const totalTime = nowTime - startTime;
      const renderTime = totalTime - scriptTime;
      console.log(`${sign}[render]: ${renderTime}ms`);
      console.log(`${sign}[total]: ${totalTime}ms`);
      longTask();
    }
  }

  // 将length调大，方便在 chrome performance 找到函数调用，执行时长过短的函数会被自动过滤
  function longTask(length = 1) {
    for (let i = 0, num = 0; i < length; i++) {
      num = i * i * i;
    }
  }
})();