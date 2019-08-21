<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGroupDiscountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_discounts', function (Blueprint $table) {
            $table->bigInteger('id')->autoIncrement();

            $table->string('name');

            $table->bigInteger('item_id');
            $table->foreign('item_id')
                ->on('items')
                ->references('id');

            $table->integer('min_quantity')->default(0);
            $table->integer('max_quantity')->default(0);

            $table->float('value')->default(0.0);
            $table->enum('type', [ 'percent', 'price' ])->default('percent');

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
        Schema::dropIfExists('group_discounts');
    }
}
