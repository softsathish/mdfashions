ALTER View categories_products_view
as
select 
count(order_products.productID) as orderCnt, 
GROUP_CONCAT(variants.name, ':', variant_terms.name) as variants,
(select case when product_images.image is null then products.image else product_images.image end) AS image,
products.price - products.offerPrice AS discount,
products.id,products.title,products.price,products.status,products.free_shipping,products.returns,products.views,products.offerPrice,products.offerStart,products.offerEnd,
categories.id AS categoryID,categories.name AS categoryName 
from products 
left join product_images on product_images.productID = products.id and products.splitByImage = 1 
join product_categories on product_categories.productID = products.id 
join categories on categories.id = product_categories.categoryID 
left join product_variants on product_variants.productID = products.id
left join variant_terms on variant_terms.id = product_variants.variant_term_id
left join variants on variants.id = variant_terms.variant_id
left join order_products on order_products.productID = products.id
where products.status = 0 
group by image 
order by products.id desc