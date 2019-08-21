<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderItemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_item', function (Blueprint $table) {
            $table->bigInteger('id')->autoIncrement();

            $table->integer('qty')->default(0);
            $table->float('total')->default(0);
            $table->float('calculated')->default(0);

            $table->bigInteger('item_id');
            $table->foreign('item_id')
                ->on('items')
                ->references('id');

            $table->bigInteger('group_discount_id')->nullable(true);
            $table->foreign('group_discount_id')
                ->on('group_discounts')
                ->references('id');

            $table->bigInteger('order_id');
            $table->foreign('order_id')
                ->on('orders')
                ->references('id');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_item');
    }
}
