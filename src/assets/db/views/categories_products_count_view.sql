Alter View categories_products_count_view
As
select cp.categoryID, cp.categoryName, (select image from categories_products_view where categoryID = cp.categoryID order by id desc limit 1) as image, 
count(id) as productCount
from categories_products_view as cp
group by cp.categoryID