//------------- blank.js -------------//
$(document).ready(function() {

	$(function() {

        $("#uploader").plupload({
            // General settings
            runtimes : 'html5,flash,silverlight,html4',
            url : "/plupload/uploadImage",

            // Maximum file size
            max_file_size : '20mb',

            chunk_size: '2mb',

            // Resize images on clientside if we can
            resize : {
                width : 800,
                height : 800,
                quality : 100,
                crop: false // crop to exact dimensions
            },

            // Specify what files to browse for
            filters : [
                {title : "Image files", extensions : "jpg,gif,png"},
                {title : "Zip files", extensions : "zip,avi"}
            ],
            
            init : {
            	/*页面打开时进行初始化界面,如加载已经上传的文件信息*/  
                Init : function(up, file, info) {    
                  // $('#filelist tbody').html("<tr><td>暂无上传文件</td></tr>");
                	console.info("页面打开时进行初始化界面,如加载已经上传的文件信息");
                	console.info(up);
                    console.info(file);
                },
                
                FileUploaded : function(up, file, info) {//文件上传完毕触发
                    console.info(up);
                    console.info(file);
                    console.info(info);
                    var response = $.parseJSON(info.response);
                    if(info.status && info.status == 200 && response){
        	    		if(response && response.code == '0000' && response.nameList && response.nameList.length >0){
        	    			for(var i=0;i<response.nameList.length;i++){
        	    				var name = response.nameList[i];
        		        		if(i==0){
        		        			$('#'+file.id).append('<input type="hidden" id="pic_'+file.id+'" class="pictures" value="'+name+'"/>');
        		        		}
        	    			}
        	    			
        	    			/*$(response.nameList).each(function(i){
        		        		var name = response.nameList[i];
        		        		if(i==0){
        		        			$('#'+file.id).append('<input type="hidden" id="pic_'+file.id+'" class="pictures" value="'+name+'"/>');
        		        		}
        	        		});*/
        	    		}
        	    	}
                }
            },
            

            // Rename files by clicking on their titles
            rename: true,

            // Sort files
            sortable: true,

            // Enable ability to drag'n'drop files onto the widget (currently only HTML5 supports that)
            dragdrop: true,

            // Views to activate
            views: {
                list: false,
                thumbs: true, // Show thumbs
                active: 'thumbs'
            },

            // Flash settings
            flash_swf_url : '/static/assets/plugins/file/plupload/Moxie.swf',

            // Silverlight settings
            silverlight_xap_url : '/static/assets/plugins/file/plupload/js/Moxie.xap'
        });

	});
 	
});