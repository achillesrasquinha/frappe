frappe.pages.chat.on_page_load = (parent) => {
	parent.page 		   = new frappe.ui.Page({
		parent: parent,
		 title: __("Chat")
	});

	frappe.pages.chat.chat = new frappe.Chat(parent);
}

frappe.Chat = class {
	constructor (parent, options) {
		this.options = Object.assign({ }, frappe.Chat.OPTIONS, options);
		this.$parent = $(parent);
		
		frappe.require('assets/frappe/css/chat.css', () => {
			this.make();
			this.render();
		})
	}

	make ( ) {
		this.make_wrapper();
		this.make_sidebar_left();
		this.make_sidebar_right();
		this.make_message_list();

		this.setup_chat_editor();
	}

	make_wrapper ( ) {
		this.$wrapper = $(frappe.Chat.Template.PAGE);
		this.$parent.find('.layout-main-section').append(this.$wrapper);
	}

	make_sidebar_left ( ) {
		this.$sidebar_left = $(frappe.Chat.Template.SIDEBAR);
		this.$sidebar_left_list = this.$sidebar_left.find('.frappe-chat-sidebar-list')
		this.$parent.find('.layout-side-section').append(this.$sidebar_left);

		this.make_sidebar_left_search()
	}

	make_sidebar_left_search ( ) {
		this.make_dialog_new_room()
		this.make_btn_new_room()
	}

	make_dialog_new_room ( ) {
		this.dialog_new_room = new frappe.ui.Dialog({
			title: __('New Room'),
			fields: [
				{
					fieldtype: 'Data',
					fieldname: 'name',
					label: 'Name'
				},
				{
					fieldtype: 'Data',
					fieldname: 'users',
					label: 'Invite Users'
				},
				{
					fieldtype: 'Check',
					fieldname: 'is_public',
					label: 'Public'
				},
				{
					fieldtype: 'Check',
					fieldname: 'is_read_only',
					label: 'Read Only'
				}
			]
		})
		this.dialog_new_room.set_primary_action(__('Create'), () => {
			this.dialog_new_room.hide()
		})
		const { input } = this.dialog_new_room.fields_dict.users
		frappe.dom.awesome_completify(input) // careful, limited to user only as of now.
	}

	make_btn_new_room ( ) {
		this.$btn_new_room = this.$sidebar_left.find('.frappe-chat-btn-new-room')
		this.$btn_new_room.on('click', () => {
			this.dialog_new_room.show()
		})
	}

	make_sidebar_right ( ) {
		this.$sidebar_right = this.$wrapper.find('.frappe-chat-sidebar-right')
		this.$sidebar_right_list = this.$sidebar_right.find('.frappe-chat-sidebar-right-list')
	
		const sidebar_right_meta = [
			{
				'icon': 'octicon octicon-organization'
			}
		]

		sidebar_right_meta.forEach((meta) => {
			this.$sidebar_right_list.append(
				`
				<li>
					<a href="javascript:void(0);">
						<div class="text-center">
							<i class="${meta.icon}"/>
						</div>
					</a>
				</li>
				`
			)
		})
	}

	make_message_list ( ) {
		this.$message_list = this.$wrapper.find('.frappe-chat-message-list')
	}

	setup_chat_editor ( ) {
		this.editor = this.$wrapper.find('.frappe-chat-editor')
		this.$btn_send = this.$wrapper.find('.btn-send')
		this.editor.on('submit', (event) => {
			if ( !event.isDefaultPrevented() ) {
				event.preventDefault();
			}

			const $input  = this.editor.find('textarea')
			const content = $input.val()
			const current_room = this.get_current_room()

			const message = content // have it wrapped in a message object

			this.render_local_message(message)
			
			$input.val('')

			frappe.call({
				method: 'frappe.desk.doctype.chat_message.chat_message.send_message',
				args: {
					room: current_room,
					message: message
				}
			})
		})

		this.editor.keydown('ctrl+return', () => {
			this.$btn_send.click()
		})
	}

	render_local_message (message) {
		const $message = $(frappe.Chat.Template.MESSAGE)
		$message.find('.frappe-chat-message-content').html(message)

		this.$message_list.append($message)
	}

	get_current_room ( ) {
		// const room = this.$wrapper.
		return "Frappe UI";
	}

	render ( ) {
		this.render_sidebar()
	}

	render_sidebar ( ) {
		const user  = frappe.session.user

		frappe.db.get_list('Chat Room User', {
			filters: { user },
			fields: ['parent']
		}).then((result) => {
			const rooms = result.map(cursor => cursor.parent)
			rooms.forEach((room) => {
				this.$sidebar_left_list.append(
					`<li data-chatroom="${room}">
						<a>
							<div class="h6">
								${room}
							</div>
						</a>
					</li>
					`
				)
			})

			this.bind_events();
		})
	}

	bind_events ( ) {
		console.log('called')
		this.bind_setup_room()
		this.bind_realtime_message()
	}

	bind_setup_room ( ) {
		const that = this
		this.$sidebar_left_list.on('click', 'li', function ( ) {
			const room = $(this).data('chatroom')

			that.setup_room(room)
		})
	}

	bind_realtime_message ( ) {
		frappe.realtime.on(`chat:action`, (message) => {
			console.log(message)
		})
	}

	setup_room (room) {
		frappe.db.get_doc('Chat Room', room).then((doc) => {
			
		})
	}
}
frappe.Chat.OPTIONS = {

}
frappe.Chat.Template = { }
frappe.Chat.Template.MESSAGE = 
`
<div class="frappe-chat-message">
	<div class="alert alert-success">
		<div class="frappe-chat-message-content">

		</div>
	</div>
</div>
`
frappe.Chat.Template.SIDEBAR =
`
<div class="frappe-chat-sidebar">
	
	<form class="frappe-chat-sidebar-search">
		<div class="input-group input-group-sm">
			<input class="form-control" placeholder="Search"/>

			<div class="input-group-btn">
				<button class="btn frappe-chat-btn-new-room btn-primary">
					<i class="octicon octicon-plus"/>
				</button>
			</div>

		</div>
	</form>

	<ul class="frappe-chat-sidebar-list nav nav-pills nav-stacked">

	</ul>

</div>
`;
frappe.Chat.Template.PAGE = 
`
<div class="frappe-chat-page">
	<div class="row">
		<div class="col-md-11">
			<div class="frappe-chat-room">
				<div class="frappe-chat-message-list">

				</div>
			</div>
			<div class="frappe-chat-editor-wrapper">
				<form class="frappe-chat-editor">
					<div class="panel panel-default">
						
						<div class="panel-body">
							<textarea class="form-control"/>
						</div>

						<div class="panel-footer">
							<div class="text-right">
								<button class="btn btn-sm btn-primary btn-send" value="submit">
									Send
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>

		<div class="col-md-1">
			<div class="frappe-chat-sidebar-right">
				<ul class="frappe-chat-sidebar-right-list nav nav-pills nav-stacked">

				</ul>
			</div>
		</div>
	</div>
</div>
`;

// frappe.Chat2 = class {
// 	constructor (wrapper, page) {
// 		this.wrapper = wrapper;
// 		this.page = wrapper.page;
// 		this.make();
// 		this.page.sidebar.addClass("col-sm-3");
// 		this.page.wrapper.find(".layout-main-section-wrapper").addClass("col-sm-9");
// 		this.page.wrapper.find(".page-title").removeClass("col-xs-6").addClass("col-xs-12");
// 		this.page.wrapper.find(".page-actions").removeClass("col-xs-6").addClass("hidden-xs");
// 		this.setup_realtime();
// 	}

// 	make() {
// 		this.make_sidebar();
// 	}

// 	setup_realtime() {
// 		var me = this;
// 		frappe.realtime.on('new_message', function(comment) {
// 			if(comment.modified_by !== frappe.session.user || comment.communication_type === 'Bot') {
// 				if(frappe.get_route()[0] === 'chat') {
// 					var current_contact = $(cur_page.page).find('[data-contact]').data('contact');
// 					var on_broadcast_page = current_contact === frappe.session.user;
// 					if ((current_contact == comment.owner)
// 						|| (on_broadcast_page && comment.broadcast)
// 						|| current_contact === 'Bot' && comment.communication_type === 'Bot') {

// 						setTimeout(function() { me.prepend_comment(comment); }, 1000);
// 					}
// 				} else {
// 					frappe.utils.notify(__("Message from {0}", [frappe.user_info(comment.owner).fullname]), comment.content);
// 				}
// 			}
// 		});
// 	}

// 	prepend_comment(comment) {
// 		frappe.pages.chat.chat.list.data.unshift(comment);
// 		this.render_row(comment, true);
// 	}

// 	make_sidebar() {
// 		var me = this;
// 		return frappe.call({
// 			module:'frappe.desk',
// 			page:'chat',
// 			method:'get_active_users',
// 			callback(r,rt) {
// 				// sort
// 				r.message.sort(function(a, b) { return cint(b.has_session) - cint(a.has_session); });

// 				// render
// 				me.page.sidebar.html(frappe.render_template("chat_sidebar", {data: r.message}));

// 				// bind click
// 				me.page.sidebar.find("a").on("click", function() {
// 					var li = $(this).parents("li:first");
// 					if (li.hasClass("active"))
// 						return false;

// 					var contact = li.attr("data-user");

// 					// active
// 					me.page.sidebar.find("li.active").removeClass("active");
// 					me.page.sidebar.find('[data-user="'+ contact +'"]').addClass("active");

// 					me.make_messages(contact);
// 				});

// 				$(me.page.sidebar.find("a")[0]).click();
// 			}
// 		});
// 	}

// 	make_messages(contact) {
// 		var me = this;

// 		this.page.main.html($(frappe.render_template("chat_main", { "contact": contact })));

// 		var text_area = this.page.main.find(".messages-textarea").on("focusout", function() {
// 			// on touchscreen devices, scroll to top
// 			// so that static navbar and page head don't overlap the textarea
// 			if (frappe.dom.is_touchscreen()) {
// 				frappe.utils.scroll_to($(this).parents(".message-box"));
// 			}
// 		});

// 		var post_btn = this.page.main.find(".btn-post").on("click", function() {
// 			var btn = $(this);
// 			var message_box = btn.parents(".message-box");
// 			var textarea = message_box.find("textarea");
// 			var contact = btn.attr("data-contact");
// 			var txt = textarea.val();
// 			var send_email = message_box.find('input[type="checkbox"]:checked').length > 0;

// 			if(txt) {
// 				return frappe.call({
// 					module: 'frappe.desk',
// 					page:'chat',
// 					method:'post',
// 					args: {
// 						txt: txt,
// 						contact: contact,
// 						notify: send_email ? 1 : 0
// 					},
// 					callback:function(r,rt) {
// 						textarea.val('');
// 						if (!r.exc) {
// 							me.prepend_comment(r.message);
// 						}
// 					},
// 					btn: this
// 				});
// 			}
// 		});

// 		text_area.keydown("meta+return ctrl+return", function(e) {
// 			post_btn.trigger("click");
// 		});

// 		this.page.wrapper.find(".page-head .message-to").html(frappe.user.full_name(contact));

// 		this.make_message_list(contact);

// 		this.list.run();

// 		frappe.utils.scroll_to();
// 	}

// 	make_message_list(contact) {
// 		var me = this;

// 		this.list = new frappe.ui.BaseList({
// 			parent: this.page.main.find(".message-list"),
// 			page: this.page,
// 			method: 'frappe.desk.page.chat.chat.get_list',
// 			args: {
// 				contact: contact
// 			},
// 			hide_refresh: true,
// 			freeze: false,
// 			render_view (values) {
// 				values.map(function (value) {
// 					me.render_row(value);
// 				});
// 			},
// 		});
// 	}

// 	render_row(value, prepend) {
// 		this.prepare(value)

// 		var wrapper = $('<div class="list-row">')
// 			.data("data", this.meta)

// 		if(!prepend)
// 			wrapper.appendTo($(".result-list")).get(0);
// 		else
// 			wrapper.prependTo($(".result-list")).get(0);

// 		var row = $(frappe.render_template("chat_row", {
// 			data: value
// 		})).appendTo(wrapper)
// 		row.find(".avatar, .indicator").tooltip();
// 	}

// 	delete(ele) {
// 		$(ele).parent().css('opacity', 0.6);
// 		return frappe.call({
// 			method: 'frappe.desk.page.chat.chat.delete',
// 			args: {name : $(ele).attr('data-name')},
// 			callback() {
// 				$(ele).parents(".list-row:first").toggle(false);
// 			}
// 		});
// 	}

// 	refresh() {}

// 	get_contact() {
// 		var route = location.hash;
// 		if(route.indexOf('/')!=-1) {
// 			var name = decodeURIComponent(route.split('/')[1]);
// 			if(name.indexOf('__at__')!=-1) {
// 				name = name.replace('__at__', '@');
// 			}
// 			return name;
// 		}
// 	}

// 	prepare(data) {
// 		if(data.communication_type==="Notification" || data.comment_type==="Shared") {
// 			data.is_system_message = 1;
// 		}

// 		if(data.owner==data.reference_name
// 			&& data.communication_type!=="Notification"
// 			&& data.comment_type!=="Bot") {
// 			data.is_public = true;
// 		}

// 		if(data.owner==data.reference_name && data.communication_type !== "Bot") {
// 			data.is_mine = true;
// 		}

// 		if(data.owner==data.reference_name && data.communication_type === "Bot") {
// 			data.owner = 'bot';
// 		}

// 		data.content = frappe.markdown(data.content.substr(0, 1000));
// 	}



// }
