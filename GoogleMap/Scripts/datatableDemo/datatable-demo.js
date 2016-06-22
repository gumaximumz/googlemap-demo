"strict mode"
class DatatableDemo {
    constructor() {
        this.dataTableDemo = $('#datatable_demo');
        this.mydata = [
    {
        "name": "Tiger Nixon",
        "position": "System Architect",
        "salary": "$3,120",
        "start_date": "2011/04/25",
        "office": "Edinburgh",
        "extn": "5421"
    },
    {
        "name": "Tiger Nixon2",
        "position": "System Architect4",
        "salary": "$3,120",
        "start_date": "2011/04/25",
        "office": "Edinburgh",
        "extn": "5421"
    },
    {
        "name": "Tiger Nixon3",
        "position": "System Architect3",
        "salary": "$3,120",
        "start_date": "2011/04/25",
        "office": "Edinburgh",
        "extn": "5421"
    },
    {
        "name": "Tiger Nixon4",
        "position": "System Architect2",
        "salary": "$3,120",
        "start_date": "2011/04/25",
        "office": "Edinburgh",
        "extn": "5421"
    },
    {
        "name": "Garrett Winters",
        "position": "Director",
        "salary": "$5,300",
        "start_date": "2011/07/25",
        "office": "Edinburgh",
        "extn": "8422"
    }
        ];
    }
    init() {

        this.createTable();

    }

    createTable() {
        let me = this;
        me.dataTableDemo.DataTable({
            data: me.mydata,
            columns: [
        { data: 'name' },
        { data: 'position' },
        { data: 'office' },
        { data: 'extn' },
        { data: 'start_date' },
        { data: 'salary' }
    ]
        });
    }
}