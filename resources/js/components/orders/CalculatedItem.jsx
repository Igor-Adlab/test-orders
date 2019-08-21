import React from 'react';
import {Tag} from "antd";

export function CalculatedItem({info, qty}) {

    let cutoff = 0;
    const cost = (info && info.item) ? (info.item.price * qty) : 0;

    const discount = info ? info.discount : false;
    if (discount) {
        cutoff = info.discount.type === 'price'
            ? (info.discount.value || 0)
            : ((cost / 100) * (info.discount.value || 0))
    }

    const total = cost - cutoff;

    return (
        <div>
            <p className="mb-0">
                <strong>{'Cost: '}</strong>{`$${cost}`}
            </p>
            <div>
                <p className="mb-0">
                    <strong>{'Discount: '}</strong>{`-$${cutoff}`}
                </p>
                {discount ? <div>
                    <Tag className="m-0" color="blue">{discount.name}</Tag>
                </div> : null}
            </div>
            <p className="mb-0">
                <strong>{'Total: '} </strong>{`$${total}`}
            </p>
        </div>
    );
}
