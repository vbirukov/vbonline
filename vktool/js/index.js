

let currentUser = {}, targetUser = 0, currentItem = {}, vkInterface = {};

$(document).ready(function(){
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();


  var options = [
    {selector: '#loadmore', offset: 0, callback: function() {
      $('#loadmore').click();
    } },
  ];
  Materialize.scrollFire(options);

});

function activatePanel() {
  //слушаем клики на главной панели
  var buttonPanel = document.getElementById('buttonPanel');
  buttonPanel.addEventListener('click', function (event) {
    //считываем дата-параметры клинутого элемента
    var dataOptions = event.target.dataset;
    var requestType = dataOptions.getter ? 'getter' : 'setter';
    if (dataOptions.command === 'login') {
      login();
    } else if (dataOptions.command === 'logout') {
      logout();
    } else {
      vkInterface.mainPanelClick[requestType](dataOptions);
    }
  });

  //запускаем прослушку кликов на области вывода информации
  var workspace = document.getElementById('workspace');
  workspace.addEventListener('click', function (event) {

    //запрашиваеv дата-теги с Html элемента
    var dataOptions = event.target.dataset;
    //если клик по фото с дата-тэгом "photo" то просто передаем URL
    if (dataOptions.type === 'photo' || dataOptions.type === 'ticker' || dataOptions.type === 'delete') {
      vkInterface.workspaceClick[dataOptions.type](event.target);
    } else { //или просто отправляем клик на обработку
      vkInterface.workspaceClick[dataOptions.type](dataOptions);
    }
  });
}

function runApiRequest(command, options) {
  const displayAs = options.displayAs;
  return new Promise(function(resolve, reject) {
      VK.Api.call(command, options.requestOptions, async function (r) {
      if (r.response) {
        let data = {
          displayAs: displayAs,
          response: r.response,
        };
        if (options.displayRefresh != undefined) {
          data.displayRefresh = options.displayRefresh;
        }
        resolve(data);
      } else {
        reject();
      }
    });
  });
}

function login() {
  console.log('logging in...');
  VK.Auth.login(function (response) {
    if (response.session) {
      console.log('Пользователь ' + response.session.user.first_name + ' ' + response.session.user.last_name + ' успешно авторизовался');
      currentUser = response.session.user.id;
      vkInterface.targetUser = currentUser;
      console.log('registered user object: ' + JSON.stringify(currentUser));
      $("#loginBtn").removeClass('off');
      $("#loginBtn i").removeClass('red-text');
      $("#loginBtn i").addClass('green-text');
      $("#loginBtn").addClass('on');
      $('#mainButtons').fadeToggle();
      document.getElementById('loginBtn').dataset.command = 'logout';
      if (response.settings) {
        console.log("Выбранные настройки доступа пользователя, если они были запрошены");
      }
    } else {
      console.log("Пользователь нажал кнопку Отмена в окне авторизации");
    }
  }, 262150);
  $('#getUserPhotosBtn').prop('disabled', function (_, val) {
    return !val;
  });
  $('#getUserGroupsBtn').prop('disabled', function (_, val) {
    return !val;
  });
}

function logout() {
  VK.Auth.logout(()=> {
      clearWorkspace();
      document.getElementById('loginBtn').dataset.command = 'login';
      $("#loginBtn").removeClass('on');
      $("#loginBtn i").removeClass('green-text');
      $("#loginBtn i").addClass('red-text');
      $("#loginBtn").addClass('off');
      $('#mainButtons').fadeToggle();
  });
}

function showSuccessWindow() {
  displayFadedSuccess = function displayFadedSuccess() {
    var successSign = document.getElementById('successSign');
    successSign.modal.open();
    setTimeout(500, successSign.modal.close());
  };
  // TODO: show success window
  console.log('command completed successfully');
}

function updateWorkspace(ClickedElementOptions) {
  var requestObectCommand = vkInterface.defineRequest[ClickedElementOptions.requestThisObjectCommand];
  var requestOptions = vkInterface.apiOptions[ClickedElementOptions.requestedObectId];
  var vkResponse = vkInterface.runApiRequest(requestedObjectCommand, requestOptions);
  vkInterface.display(vkResponse, ClickedElementOptions.displayAs);
}

// var vkhandler = {
//   vkInterface: vkInterface,
//   events: events
// };

const workspace = document.getElementById('workspace');

function display(data) {
  displayFuncs[data.displayAs](data);
}

const displayFuncs = {
  'photo': (data) => {
    $('#photoFrame').attr('src', data.src).modal('open');
  },
  'albums': (data) => {
    clearWorkspace();
    data.response.forEach( (currentItem) => {

      let albumCover = document.createElement('div');


      albumCover.className = 'albumCover col s3';

      let albumThumb = document.createElement('img');
      albumThumb.setAttribute('src', currentItem.thumb_src);
      albumThumb.setAttribute('data-type', 'album');
      albumThumb.className = 'responsive-img';
      albumThumb.setAttribute('data-id', currentItem.aid);
      albumCover.appendChild(albumThumb);


      const title     = document.createElement('h2');
      title.innerText = currentItem.title;
      title.className = 'albumTitle';
      albumCover.appendChild(title);

      const size     = document.createElement('p');
      size.innerText = currentItem.size;
      size.className = 'albumSize badge';
      albumCover.appendChild(size);

      workspace.appendChild(albumCover);
    });
  },
  'album': (data) => {
    clearWorkspace()
    data.response.forEach( (currentItem) => {

      let photoFrame = document.createElement('div');
      photoFrame.className = 'photo col s3';

      let instrumentsPanel = document.createElement('div');
      instrumentsPanel.className = 'instrumentsPanel'

      let ticker = document.createElement('i');
      ticker.className = "fa fa-circle-o ticker";
      ticker.setAttribute('aria-hidden', true);
      ticker.setAttribute('aria-hidden', true);
      ticker.setAttribute('data-type', 'ticker');

      let deletePhotoBtn = document.createElement('i');
      deletePhotoBtn.className = 'fa fa-files-o copyBtn'
      deletePhotoBtn.setAttribute('aria-hidden', true);
      deletePhotoBtn.setAttribute('aria-hidden', true);
      deletePhotoBtn.setAttribute('data-action', 'copy');
      deletePhotoBtn.setAttribute('data-type', 'copy');

      let photo = document.createElement('img');
      if (currentItem.src_xxxbig) {
        photo.setAttribute('src', currentItem.src_xxxbig);
      } else if (currentItem.src_xxbig) {
        photo.setAttribute('src', currentItem.src_xxbig);
      } else if (currentItem.src_xbig) {
        photo.setAttribute('src', currentItem.src_xbig);
      } else {
        photo.setAttribute('src', currentItem.src_big);
      };
      photo.setAttribute('data-type', 'photo');
      photo.setAttribute('data-id', currentItem.pid);
      photo.className = 'responsive-img';

      photoFrame.appendChild(photo);
      photoFrame.appendChild(instrumentsPanel);
      instrumentsPanel.appendChild(ticker);
      instrumentsPanel.appendChild(deletePhotoBtn);

      workspace.appendChild(photoFrame);
    });
  },
  'groups': (data) => {
    clearWorkspace();
    
    if (document.getElementById('shift') == undefined) {
		let shift = document.createElement('input');
		shift.type = 'text';
		shift.id = 'shift';
		shift.placeholder = 'задате смещение для выдачи постов'
		document.getElementById('buttonPanel').appendChild(shift);
    }
    data.response.forEach( (currentItem) => {

      let item = document.createElement('div');

      item.className = 'col-2';
      item.setAttribute('data-type', 'group');
      item.setAttribute('data-id', currentItem.gid);

      let itemThumb = document.createElement('img');
      itemThumb.setAttribute('src', currentItem.photo_big);
      itemThumb.setAttribute('data-type', 'group');
      itemThumb.setAttribute('data-id', currentItem.gid);
      itemThumb.className = 'responsive-img circle';
      item.appendChild(itemThumb);


      const title     = document.createElement('h2');
      title.innerText = currentItem.name;
      title.className = 'albumTitle';
      item.appendChild(title);

      workspace.appendChild(item);
    });
  },
  'wall': (data) => {

    $('#workspace').hide();

    if(data.displayRefresh == undefined) {
      clearWorkspace();

      let navButtons = document.createElement('div');
      navButtons.className = 'row col-12 justify-between';

      let buttonPrevPhotos = document.createElement('button');
      buttonPrevPhotos.innerHTML = '<i class="fa fa-chevron-left" aria-hidden="true"></i>'
      buttonPrevPhotos.setAttribute('data-type', 'group');
      buttonPrevPhotos.setAttribute('data-shift', 'back');
      buttonPrevPhotos.setAttribute('data-id', -data.response[1].to_id);
      buttonPrevPhotos.className = 'btn btn-main';
      navButtons.appendChild(buttonPrevPhotos);

      let buttonGoToFirstPage = document.createElement('button');
      buttonGoToFirstPage.innerHTML = '<i class="fa fa-repeat" aria-hidden="true"></i>'
      buttonGoToFirstPage.setAttribute('data-type', 'group');
      buttonGoToFirstPage.setAttribute('data-shift', 'reset');
      buttonGoToFirstPage.setAttribute('data-id', -data.response[1].to_id);
      buttonGoToFirstPage.className = 'btn btn-main';
      navButtons.appendChild(buttonGoToFirstPage);

      let buttonNextPhotos = document.createElement('button');
      buttonNextPhotos.innerHTML = '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
      buttonNextPhotos.setAttribute('data-type', 'group');
      buttonNextPhotos.setAttribute('data-shift', 'forward');
      buttonNextPhotos.setAttribute('data-id', -data.response[1].to_id);
      buttonNextPhotos.className = 'btn btn-main';
      navButtons.appendChild(buttonNextPhotos);
      workspace.appendChild(navButtons);
    };

    if (data.displayRefresh != undefined) {
      $('#loadmore').parent().remove();
    };

    data.response.forEach( (currentItem, index) => {

      if (currentItem.attachments != undefined) {
        currentItem.attachments.forEach((Attachment) => {
          if (Attachment.photo != undefined) {
            let item = document.createElement('img');
            item.className = 'responsive-img';
            item.setAttribute('data-type', 'photo');
            item.setAttribute('alt', currentAlbumOffset + ' ' +  index);
            // item.setAttribute('data-id', currentItemAttachment.photo.pid);
            if (Attachment.photo.src_xxbig != undefined) {
              item.setAttribute('src', Attachment.photo.src_xxbig);
            } else if (Attachment.photo.src_xbig != undefined) {
              item.setAttribute('src', Attachment.photo.src_xbig);
            } else if (Attachment.photo.src_big != undefined) {
              item.setAttribute('src', Attachment.photo.src_big);
            } else {
              item.setAttribute('src', Attachment.photo.src);
            };
            let frame = document.createElement('div');
            frame.className = 'col s3 common-photo';
            frame.appendChild(item);
            let photoInfo = document.createElement('p');
            photoInfo.innerText = 'likes: ' + currentItem.likes.count + ' ' + 'post# ' + ( 0 + currentAlbumOffset + index);
            photoInfo.className = 'photo-info';
            frame.appendChild(photoInfo);
            let deleteButton = document.createElement('button');
            deleteButton.className = 'btn-delete-elem';
            deleteButton.setAttribute('data-type', 'delete');
            deleteButton.innerText = 'X';
            frame.appendChild(deleteButton);
            workspace.appendChild(frame);
            }
        });
      }
    });
    if (currentItem[-data.response[1].from_id] == undefined) {
      currentItem[-data.response[1].from_id] = {};
      currentItem[-data.response[1].from_id].offset = 0;
    };

    let fullWidthWrapper = document.createElement('div');
    fullWidthWrapper.className = 'col s12';
    let loadMore = document.createElement('button');
    loadMore.innerText = '...'
    loadMore.setAttribute('data-type', 'group');
    loadMore.setAttribute('data-wallAdd', 'true');
    loadMore.id = 'loadmore';
    loadMore.setAttribute('data-shift', 'forward');
    loadMore.setAttribute('data-id', -data.response[1].to_id);
    loadMore.className = 'btn-load-more btn btn-main mx-auto';
    fullWidthWrapper.appendChild(loadMore);
    workspace.appendChild(fullWidthWrapper);

    setTimeout(console.log('waiting...'), 10000);
    $('#workspace').show()
  },
};

function clearWorkspace() {
  $('#workspace').empty();
}

vkInterface = {
  apiOptions: {
    getAllAlbums: () => {
      return {
      requestOptions: {
        owner_id: currentUser,
        need_system: 1,
        need_covers: 1,
      },
      displayAs: 'albums',
    }
    },
    getOneAlbum: () => {
        return {
          requestOptions: {
            owner_id: vkInterface.targetUser,
            album_id: currentItem,
        },
        displayAs: 'singleAlbum',
      }
   },
   getAllGroups: () => {
      return {
        requestOptions: {
          owner_id: vkInterface.targetUser,
          extended: 1,
          count: 200,
        },
        displayAs: 'groups',
    }
},
},
  display: display,
  login: login,
  runApiRequest: runApiRequest,
  showSuccessWindow: showSuccessWindow,
  workspaceClick: {

    //считав в функции вызова, data-теги, html элдемента по кторому сработал клик
    //передаем их сюда аким макаром: workspaceClick(dataset-elementType)
    //тким образм понимает с какими параметрами надо запускать запрос в ВК
    photo: (clickedElement) => {
      $('#photoToShow').attr('src', clickedElement.getAttribute('src'));
      $('#photoFrame').modal('open').attr('max-height', '100%').attr('width', 'auto').css('margin-top', '-5%');
    },
    photoSelect: function photoSelect(ClickedElementOptions) {
      ClickedElementOptions.selected = 'true';
    },
    group: function group(ClickedElementOptions) {
      let groupId = -ClickedElementOptions.id;
      let shift = document.getElementById('shift').value;
      let callOptions = {
        displayAs: 'wall',
        requestOptions: {
          owner_id: groupId,
          count: 100,
        },
      }
      if (ClickedElementOptions.walladd == 'true') {
        callOptions.displayRefresh = 'none';
      };
      switch (ClickedElementOptions.shift) {
        case 'back': {
          let currentOffset = currentItem[-groupId].offset;
          let newOffset = currentOffset - 100;
          currentItem[-groupId].offset = newOffset;
          currentAlbumOffset = newOffset;
        }
          break;
        case 'forward': {
          let currentOffset = currentItem[-groupId].offset;
          let newOffset = currentOffset + 100;
          currentItem[-groupId].offset = newOffset;
          currentAlbumOffset = newOffset;
        }
          break;
        case 'reset':
        currentItem[-groupId].offset = 0;
          break;
      };

      if (currentItem[-groupId] != undefined) {
        if (currentItem[-groupId].offset != undefined) {
          callOptions.requestOptions.offset = currentItem[-groupId].offset;
        };
      };
      
     if (currentItem[-groupId] == undefined) {
   		callOptions.requestOptions.offset = shift;
   		currentAlbumOffset = shift;
      }
      
      vkInterface.runApiRequest('wall.get', callOptions ).then(vkInterface.display);
      // var group = vkInterface.runApiRequest('groups.getById', {requestOptions: { group_ids: ClickedElementOptions.id }}).then(vkInterface.display);
    },
    album: function album(ClickedElementOptions) {
      let callOptions = {
        displayAs: 'album',
        requestOptions: {
          owner_id: currentUser,
          album_id: ClickedElementOptions.id,
        },
      }
      vkInterface.runApiRequest('photos.get', callOptions ).then(vkInterface.display);
    },
    ticker: (ticker) => {
      let photo = ticker.parentNode.previousSibling;
      //отметить фотку для операции
      photo.setAttribute('data-select', true);
      //изменить иконку тикера
      ticker.className="fa fa-check-circle ticker"
    },
    copy: (target) => {
      let callOptions = {
        target: target,
        requestOptions: {
          owner_id: currentUser,
          photo_id: target.parentNode.previousSibling.dataset.id,
        },
      }
      vkInterface.runApiRequest('photos.delete', callOptions ).then(target.parentNode.parentNode.removeChild(target.parentNode));
    },
    delete: function deleteButtonClick(target) {
      target.parentNode.remove();
      target.remove();
    },
    deleteThis: (target) => {
      target.remove();
    },
    friend: function friend(ClickedElementOptions) {
      // TODO: hadle click on friend
      var friend = vkInterface.runApiRequest('users.get', { user_ids: ClickedElementOptions.id });
      (0, _display.display)(friend, 'friend');
    },
    listforward: () => {
      let currentPic = "'" +  $('#photoToShow').attr('src') + "'";
      let searchString = '[src=' + currentPic + ']';
      currentPic = $(searchString)[0];
      let nextPicSrc = currentPic.nextElementSibling.nextElementSibling.getAttribute('src')
      $('#photoToShow').attr('src', nextPicSrc);
    },
    listback: () => {
      let currentPic = "'" +  $('#photoToShow').attr('src') + "'";
      let searchString = '[src=' + currentPic + ']';
      currentPic = $(searchString)[0];
      let nextPicSrc = currentPic.previousSibling.previousSibling.getAttribute('src')
      $('#photoToShow').attr('src', nextPicSrc);
    },
  },
  mainPanelClick: {
    getter: (ClickedElementOptions) => {
      var requestCommand = ClickedElementOptions.apicommand;
      var requestOptions = vkInterface.apiOptions[ClickedElementOptions.command]();
      vkInterface.runApiRequest(requestCommand, requestOptions).then(vkInterface.display);
    },
    setter: function setter(ClickedElementOptions) {
      var settingCommand = vkInterface.defineRequest[ClickedElementOptions.apicommand].apiRequest;
      var requestIsSuccessful = vkInterface.runApiRequest(dataOptions.command, currentItem.apiOptions);
      if (requestIsSuccessful === 1) {
        console.log('command processed successfully, details: ' + ClickedElementOptions.apicommand + ' ' + currentItem.options);
        vkInterface.showSuccessWindow();
        vkInterface.updateWorkspace(ClickedElementOptions);
      }
    },
  }

};


activatePanel();
