Alter View products_by_images_views
As
select product_images.image, products.id, products.title, products.price, product_categories.categoryID, products.status
from product_images
join products on products.id = product_images.productID
join product_categories on product_categories.productID = products.id
ORDER BY RAND()