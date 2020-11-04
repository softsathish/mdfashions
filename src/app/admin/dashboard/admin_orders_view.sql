Create View admin_orders_view
As
select orderTbl.id, orderTbl.name, orderTbl.mobile, sum(order_products.price) as price, sum(order_products.bprice) as bprice,
(sum(order_products.price) - sum(order_products.bprice)) as margin,
(select order_status.statusID from order_status where order_status.orderID = orderTbl.id order by order_status.id desc limit 1) as statusID,
(select name from order_statuses where order_statuses.id = statusID) as statusName,
orderTbl.ordered_date as orderDate
from orderTbl 
join order_products on order_products.orderID = orderTbl.id
group by order_products.orderID