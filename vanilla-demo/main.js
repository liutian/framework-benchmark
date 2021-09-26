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
  const batchCreateBtn = $('#batch-create-btn');
  const unshiftBtn = $('#unshift-btn');
  const pushBtn = $('#push-btn');
  const shiftBtn = $('#shift-btn');
  const popBtn = $('#pop-btn');
  const targetIdInput = $('#target-id-input');
  const moveHeadBtn = $('#move-head-btn');
  const replaceBtn = $('#replace-btn');
  const delBtn = $('#del-btn');
  const containerEle = $('.container');
  const resetBtn = $('#reset-btn');
  const showStatBtn = $('#show-stat-btn');

  let maxLength = 30000;
  let list = [];

  main();

  function main() {
    bindEvent();
    maxLengthInput.value = maxLength;
    targetIdInput.value = 10;
  }

  function bindEvent() {
    batchCreateBtn.addEventListener('click', batchCreate);
    resetBtn.addEventListener('click', reset);
    unshiftBtn.addEventListener('click', unshift);
    pushBtn.addEventListener('click', push);
    shiftBtn.addEventListener('click', shift);
    popBtn.addEventListener('click', pop);
    moveHeadBtn.addEventListener('click', moveHead);
    replaceBtn.addEventListener('click', replace);
    delBtn.addEventListener('click', del);
    showStatBtn.addEventListener('click', showStat);
    maxLengthInput.addEventListener('input', () => maxLength = parseInt(maxLengthInput.value));
    containerEle.addEventListener('click', (event) => {
      if (event.target.className.includes('btn-type-comment')) {
        logger('toggle');
        const itemData = event.target.parentElement.parentElement._data;
        if (event.target._hidden || event.target._hidden === undefined) {

          const commentContainerEle = $ele('div', 'comment-container');

          const commentInputEle = $ele('input', 'comment-input');
          commentContainerEle.appendChild(commentInputEle);

          const newCommentBtn = $ele('button', null, 'ok');
          newCommentBtn.className = 'btn-type-new-comment';
          commentContainerEle.appendChild(newCommentBtn);

          const commentListEle = $ele('div', 'comment-list');
          itemData.commentList.forEach((comment) => {
            commentListEle.appendChild($ele('div', null, comment));
          });
          commentContainerEle.appendChild(commentListEle);

          event.target.parentElement.parentElement.appendChild(commentContainerEle);
          event.target._hidden = false;
        } else {
          event.target.parentElement.parentElement.lastElementChild.remove();
          event.target._hidden = true;
        }
      } else if (event.target.className.includes('btn-type-new-comment')) {
        logger('comment');
        const itemData = event.target.parentElement.parentElement._data;
        const newComment = event.target.previousElementSibling.value;
        event.target.nextElementSibling.appendChild($ele('div', null, newComment));
        event.target.previousElementSibling.value = '';
        itemData.commentList.push(newComment);
        event.target.parentElement.parentElement.querySelector('.btn-type-comment').textContent = `comment ${itemData.commentList.length}`;
      } else if (event.target.className.includes('btn-type-like')) {
        const type = 'btn-type-like';
        logger(type);
        const itemData = event.target.parentElement.parentElement._data;
        const count = itemData[type] || 0;
        event.target.textContent = `like ${count + 1}`;
        itemData[type] = count + 1;
        event.stopPropagation();
      }
    });

    containerEle.addEventListener('keypress', (event) => {
      if(event.target.className.includes('comment-input')){
        logger('keypress', true);
      }
    })
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

  function moveHead() {
    logger('moveHead');
    const moveTargetId = +targetIdInput.value;
    const index = list.findIndex(item => item.id === moveTargetId);
    const [item] = list.splice(index, 1);
    list.unshift(item);
    containerEle.insertBefore(item._ele, containerEle.children.item(0));
  }

  function replace() {
    logger('replace');
    const replaceTargetId = +targetIdInput.value;
    const oldIndex = list.findIndex(item => item.id === replaceTargetId);
    if (oldIndex === -1) {
      return;
    }

    const oldEle = list[oldIndex]._ele;

    const newItem = createItem();
    list.splice(oldIndex, 1, newItem);

    const newItemEle = createItemEle(newItem);
    containerEle.insertBefore(newItemEle, oldEle);
    oldEle.remove();
  }

  function del() {
    logger('del');
    const replaceTargetId = +targetIdInput.value;
    const oldIndex = list.findIndex(item => item.id === replaceTargetId);
    if (oldIndex === -1) {
      return;
    }

    const oldEle = list[oldIndex]._ele;
    oldEle.remove();
    list.splice(oldIndex, 1);
  }

  function batchCreate() {
    logger('batchCreate');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < maxLength; i++) {
      const item = createItem();
      list.push(item);
      const itemEle = createItemEle(item);
      fragment.appendChild(itemEle);
    }

    containerEle.appendChild(fragment);
  }

  function reset() {
    logger('reset');
    containerEle.innerHTML = '';
    list = [];
    resetUUID();
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

    const likeBtn = $ele('button');
    likeBtn.className = 'btn-type-like';
    likeBtn.appendChild(document.createTextNode('like'));
    btnActionEle.appendChild(likeBtn);

    const commentBtn = $ele('button');
    commentBtn.className = 'btn-type-comment';
    commentBtn.appendChild(document.createTextNode('comment'));
    btnActionEle.appendChild(commentBtn);

    rootEle.appendChild(btnActionEle);

    itemData._ele = rootEle;
    return rootEle;
  }

  const createItem = function () {
    let uuid = 0;
    return () => {
      return {
        id: ++uuid,
        author: "xxx",
        content: "hello world ...... ---> " + uuid,
        comments: [],
        isShowComment: false,
        like: 0,
        commentList: []
      };
    }
  }();

  const resetUUID = () => {
    uuid = 0;
  }

  const dataInfo = {};

  const logger = (trackId, useAnimationFrame = false) => {
    if (!dataInfo[trackId]) {
      dataInfo[trackId] = [];
    }

    const startTime = Date.now();
    let scriptTime;

    Promise.resolve().then(promiseFn);

    if(useAnimationFrame){
      requestAnimationFrame(timeoutFn);
    }else{
      setTimeout(timeoutFn);
    }

    function promiseFn() {
      scriptTime = Date.now() - startTime;
      console.log(`${trackId}[script]: ${scriptTime}ms`);
      longTask();
    }

    function timeoutFn() {
      const nowTime = Date.now();
      const totalTime = nowTime - startTime;
      const renderTime = totalTime - scriptTime;
      console.log(`${trackId}[render]: ${renderTime}ms`);
      console.log(`${trackId}[total]: ${totalTime}ms`);
      longTask();
      dataInfo[trackId].push({ renderTime, scriptTime, totalTime });
    }
  }

  // 将length调大，方便在 chrome performance 找到函数调用，执行时长过短的函数会被自动过滤 900000000
  function longTask(length = 1) {
    for (let i = 0, num = 0; i < length; i++) {
      num = i * i * i;
    }
  }

  function showStat() {
    Object.keys(dataInfo).forEach((trackId) => {
      console.log(`${trackId} stat : `);
      console.table(dataInfo[trackId]);
      const total = dataInfo[trackId].reduce((pre, curr) => {
        Object.keys(curr).forEach((key) => {
          pre[key] = curr[key] + (pre[key] || 0);
        });
        return pre;
      }, {});

      const avg = { ...total };

      Object.keys(avg).forEach((key) => {
        avg[key] = avg[key] / dataInfo[trackId].length;
      });

      console.log(`${trackId} avg : `);
      console.table([avg]);
    })
  }
})();