
function row(name, part, total){
	var self = this;
	self.name = name;
	self.part = ko.observable(part);
	self.total = ko.computed(function(){
		if(mv)
		var t = parseFloat(mv.bill.total());
		else
		var t = 0;
		var p = parseInt(mv.bill.parts());
		if(p > 0)
			return Number((t/p * self.part()).toFixed(2))+"€";
		else
			return 0+"€";
	});
	self.fullText = ko.computed(function(){
		return self.name + " (x" + self.part() + ") : " + self.total();
	});
}
function bill(total, p){
	var self = this;
	self.total = ko.observable(total);
	self.parts = ko.observable(p);
	self.addparts = function(more){
		self.parts(self.parts()+parseInt(more));
	}
	self.rows = ko.observableArray([
	]);
	self.addRow = function(){
		var n = $("#inputName").val();
		var p = $("#inputPart").val();
		if(p != "" && n != ""){
			var r = new row(n, p, 0);
			self.rows.push(r);
			self.addparts(p);
		}
		$("#inputName").val('');
		$("#inputPart").val('');
	}
}
function AppViewModel(){

	var self = this;
	if($("#billTotal").val() > 0)
		var billTotal = $("#billTotal").val();
	else{
		var billTotal = $("#billTotal").val(0);
		var billTotal = 0;
	}
	self.bill = new bill(billTotal, 0);
}
var mv = new AppViewModel();
ko.applyBindings(mv);