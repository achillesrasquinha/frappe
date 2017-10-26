# -*- coding: utf-8 -*-
# Copyright (c) 2017, Frappe Technologies and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class ChatMessage(Document):
	pass
	

@frappe.whitelist()
def send_message(message, room):
	doc = frappe.get_doc(dict(
		doctype = 'Chat Message',
		content = message,
		chat_room = room
	)).insert()

	frappe.db.commit()

	frappe.msgprint(doc.as_dict())

	frappe.publish_realtime('chat:action', doc.as_dict())
	