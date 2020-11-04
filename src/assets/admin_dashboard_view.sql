Alter View admin_dashboard_view
As
select (select count(*) From admin_orders_view) as totalOrder, (select count(statusID) from admin_orders_view where statusID = 6) as totalCompleted, SUM(price) as totalSales, sum(margin) as totalMargin
From admin_orders_view where statusID = 6