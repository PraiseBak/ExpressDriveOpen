// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable({
  language:{
      "search": "검색",
      "show": "출력",
      "paginate": {
        "first": "시작",
        "last": "마지막",
        "next": "다음",
        "previous": "이전"
      }
    }
  });

});
