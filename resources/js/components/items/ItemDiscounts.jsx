import React from "react";
import {Modal, Tag} from "antd";

import {useModal} from "../../utils/useModal";

import {ItemDiscountForm} from "./ItemDiscountForm";

export function ItemDiscounts({ item, page }) {
    const [ modal, actions ] = useModal();

    function openDiscount(discount, item) {
        return e => {
            e.preventDefault();
            actions.open({ discount, item });
        };
    }

    function discountSaved() {
        page.reload();
        actions.close();
    }

    return (
        <>
            {(item.discounts && item.discounts.length) ? (
            <div>
                <span>{'Discounts: '}</span>{_.map(item.discounts, discount => <Tag
                onClick={openDiscount(discount, item)}>{discount.name}</Tag>)}
                {' '}<Tag onClick={openDiscount({}, item)} color="blue">Add New Discount</Tag>
            </div>
            ) : <Tag onClick={openDiscount({}, item)} color="blue">Add Discount!</Tag>}

            <Modal
                destroyOnClose
                footer={false}
                visible={modal.visible}
                onCancel={actions.close}
            >
                <ItemDiscountForm
                    {...modal.data}
                    onError={actions.error}
                    onSaved={discountSaved}
                />
            </Modal>
        </>
    );
}
