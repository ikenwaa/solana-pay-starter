import React from 'react'
import styles from '../styles/Product.module.css'
import Buy from './Buy';

export default function Product({ product }){
    const { id, name, price, image_url } = product;

    return (
        <div className={styles.product_container}>
            <div>
                <img className={styles.product_image} src={image_url} alt={name} />
            </div>

            <div className={styles.product_details}>
                <div className={styles.product_text}>
                    <div className={styles.product_title}>{name}</div>
                    {/* <div className={styles.product_description}>{description}</div> */}
                </div>

                <div className={styles.product_action}>
                    <div className={styles.product_price}>{price} USDT</div>
                    {/* <IPFSDownload filename="storage_boxes.zip" hash="QmRcNVdvrCBkLTpLNMjz3iuu7Z79y1X8ihyVqvzquPqZDF" cta="Buy Now" /> */}
                    <Buy itemID={id} />
                </div>
            </div>
        </div>
    );
}