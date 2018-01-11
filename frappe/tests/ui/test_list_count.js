QUnit.module('Setup');

QUnit.test("Test List Count", function(assert) {
	assert.expect(3);
	const done = assert.async();

	frappe.run_serially([
		() => frappe.set_route('List', 'DocType'),
		() => frappe.timeout(0.5),
		() => {
			let count = $('.list-count').text().split(' ')[0];
			assert.equal(cur_list.data.length, count, "Correct Count");
		},

		() => frappe.timeout(1),
		() => cur_list.filter_list.add_filter('Doctype', 'module', '=', 'Desk'),
		() => frappe.tests.click_button('Refresh'),
		() => {
			let count = $('.list-count').text().split(' ')[0];
			assert.equal(cur_list.data.length, count, "Correct Count");
		},

		() => cur_list.filter_area.clear(),
		() => frappe.timeout(1),
		() => {
			cur_list.filter_list.push_new_filter('DocField', 'fieldname', 'like', 'owner');
			frappe.tests.click_button('Apply');
			let count = $('.list-row-right').text().split(' ')[0];
			assert.equal(cur_list.data.length, count, "Correct Count");
		},

		done
	]);
});