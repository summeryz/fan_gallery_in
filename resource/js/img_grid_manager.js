var Img_Grid_Manager = Img_Grid_Manager || {}

Img_Grid_Manager._resizeEvt;


Img_Grid_Manager.sectionList = [];

Img_Grid_Manager.default = function () {

}

Img_Grid_Manager.activate = function () {
	//dont init too early
	Img_Grid_Manager.grid_handler = new ImgGrid();

	Img_Grid_Manager._bindMoreGroup();
	//test one section

//
//	imgGridManager._renderImgGroup(data);
//
//	imgGridManager.resizeWindow();
	Img_Grid_Manager.bindResizeWindow();
}

Img_Grid_Manager.loadImgSection = function (sid, page) {
	if (typeof page == 'undefined') {
		page = 1;
	}

	if (typeof Img_Grid_Manager.sectionList[sid] != 'undefined') {
		console.log('Already loaded: ' + sid);
		//render
		Img_Grid_Manager._renderLoadingList(sid);
	} else {
		var sectionInfo = {'sectionId': sid};

		jQuery.ajax({
			method: 'POST',
			url: 'http://north.gallery/ajax_controller/getImg',
			data: sectionInfo,
			dataType: 'json',
			async: 'false',
			success: function (section) {
				console.log('frist loading image section' + sid);
				if (section != null && section.id != null && section.loadingList != null) {
					Img_Grid_Manager.sectionList[section.id] = section;

					//add first group
					Img_Grid_Manager._addImgGroup(sid);
				}


			},
			error: function (section) {
				console.error('loading img section ' + sid + ' fail: ' + JSON.stringify(section));
			}
		});
	}
}

//move one img group from waiting list to loading list
Img_Grid_Manager._addImgGroup = function (sid) {
	var insertPosition = jQuery("#" + sid + " > .beforeThis");

	//it is reference
	var waitingList = Img_Grid_Manager.sectionList[sid]['waitingList'];
	var loadingList = Img_Grid_Manager.sectionList[sid]['loadingList'];

	//move group from waiting list to loading list
	//add div for group
	for (var key in waitingList) {
		if (waitingList.hasOwnProperty(key)) {
			//pick one group
			var temp_group = waitingList[key];

			//move to loading list
			loadingList.push(temp_group);

			//remove from waiting list
			delete waitingList[key];

			//add new div for group
			jQuery("<div class=\"imgGroup\" id=\"" + temp_group.id + "\">" + temp_group.id + "</div>").insertBefore(insertPosition);

//			console.log("add group" + temp_group.id);


			//render new groups
			Img_Grid_Manager._renderGroup(temp_group);

//			console.log(JSON.stringify(Img_Grid_Manager.sectionList[sid]));

		}

		break;
	}


}

//add new group by click
Img_Grid_Manager._bindMoreGroup = function () {
	jQuery(".moreGroup").each(function () {
		var obj = this;
		jQuery(obj).click(function () {
			var sectionId = jQuery(obj).parent().attr('id');

			Img_Grid_Manager._addImgGroup(sectionId);
		});
	});
}


Img_Grid_Manager._renderGroup = function (gid) {
//	console.log("render group " + JSON.stringify(gid) + " need to impl");
	
	var gridHandler = Img_Grid_Manager.grid_handler;
	
	gridHandler.setImgArray(gid);
	
	gridHandler.renderImgGroup();
}

//render all groups inside loadingList
Img_Grid_Manager._renderLoadingList = function (sid) {
	if (typeof Img_Grid_Manager.sectionList[sid] == "undefined") {
		return;
	}

	var groupList = Img_Grid_Manager.sectionList[sid]['loadingList'];

	jQuery.each(groupList, function (index, obj) {
		Img_Grid_Manager._renderGroup(obj);
	});
}

//render visible section when resize
Img_Grid_Manager._renderVisibleSection = function () {
	var sectionId = null;

	jQuery(".imgSection").each(function () {
		var temp_obj = this;
		if (jQuery(temp_obj).css('display') == "block") {
			sectionId = jQuery(temp_obj).attr("id");
		}
	});

	Img_Grid_Manager._renderLoadingList(sectionId);
}

//clear this section, for paging
Img_Grid_Manager.removeImgSection = function (sid) {

}

Img_Grid_Manager.changePage = function (sid, page) {
	Img_Grid_Manager.removeImgSection(sid);

	Img_Grid_Manager.loadImgSection(sid, page);
}
//
//Img_Grid_Manager._loadImgAll = function (idList) {
//	if (typeof idList == 'undefined') {
//		return null;
//	}
//
//	var sectionList = {};
//
//
//	jQuery.each(idList, function (index, value) {
//		var section = Img_Grid_Manager._loadImgSection(value);
//
//		if ((!empty(section['id'])) && (!empty(section['loadingList']))) {
//
//			sectionList[section['id']] = section;
//		}
//
//	});
//
//	return sectionList;
//}


/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
Img_Grid_Manager.loadImg = function () {

}

Img_Grid_Manager.bindResizeWindow = function () {


	jQuery(window).resize(function () {
		clearTimeout(Img_Grid_Manager._resizeEvt);
		Img_Grid_Manager._resizeEvt = setTimeout(function () {
			Img_Grid_Manager._renderVisibleSection();
		}, 10);
	});

}