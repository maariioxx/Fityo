'use client';

import {
  addFood,
  deleteCustomFood,
  deleteFood,
  updateFood,
} from '@/lib/actions';
import { getDetailedFoodInfo } from '@/lib/utils';
import { FetchedFood, FoodsRow } from '@/types/API/foodsrow';
import { FoodNutrients } from '@/types/API/nutritionInstantEndpoint';
import { ParsedFood } from '@/types/API/nutritionSearchEndpoint';
import { Database } from 'db.types';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import MacroInfo from './MacroInfo';

export default function FoodsRow({
  food,
  date,
  userFood,
  handleQuantityChange,
  quantity,
  calories,
  carbs,
  sugar,
  fats,
  saturated_fats,
  protein,
  isUserFood,
  isCustomFood,
}: FoodsRow) {
  const [openModal, setOpenModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [modalQuantity, setModalQuantity] = useState(quantity);
  async function handleAdd() {
    let data;
    if (isCustomFood) {
      data = {
        name: food.name,
        date: date,
        food_id: Number(food.id),
        quantity: quantity,
        calories: calories,
        carbs: carbs,
        sugar: sugar,
        fats: fats,
        saturated_fats: saturated_fats,
        protein: protein,
      };
    } else {
      data = {
        name: food!.knownAs,
        date: date,
        food_id: food!.foodId,
        quantity: quantity,
        calories: calories,
        carbs: carbs,
        sugar: sugar,
        fats: fats,
        saturated_fats: saturated_fats,
        protein: protein,
      };
    }
    const res = await addFood({ data });
    console.log(res);
  }

  async function handleUpdate() {
    const res = await updateFood({
      data: {
        date: date,
        created_at: userFood?.created_at as string,
        newQuantity: modalQuantity,
        calories: (calories * modalQuantity) / quantity,
        carbs: (carbs * modalQuantity) / quantity,
        sugar: (sugar * modalQuantity) / quantity,
        fats: (fats * modalQuantity) / quantity,
        saturated_fats: (saturated_fats * modalQuantity) / quantity,
        protein: (protein * modalQuantity) / quantity,
      },
    });
    console.log(res);
  }

  async function handleCustomFoodDelete() {
    if (isCustomFood) {
      const res = await deleteCustomFood(food!.id);
      if (res) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    }
  }

  async function handleDelete() {
    const res = await deleteFood({
      date: userFood?.date as string,
      created_at: userFood?.created_at as string,
    });
  }
  return (
    <div className="space-y-5">
      <div className="flex flex-col lg:flex-row items-center lg:w-full justify-between lg:gap-16 mt-4">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-3xl">
            <span onClick={() => setOpenModal(true)} className="cursor-pointer">
              {isUserFood ? (
                <span className="text-sm lg:text-md">
                  {userFood.name}
                  <span className="text-sm"> | {userFood.quantity}g</span>
                </span>
              ) : isCustomFood ? (
                food.name
              ) : (
                food.knownAs
              )}
            </span>
          </h1>
          <Modal
            dismissible
            show={openModal}
            onClose={() => setOpenModal(false)}
          >
            <ModalHeader>
              {isUserFood
                ? userFood.name
                : isCustomFood
                ? food.name
                : food.knownAs}
            </ModalHeader>
            <ModalBody>
              <div className="flex items-end gap-4">
                Calories:{' '}
                <MacroInfo
                  macro={(calories * modalQuantity) / quantity}
                  color="text-green-700"
                />
              </div>
              <div className="flex items-end gap-4">
                Carbohydrates:{' '}
                <MacroInfo
                  macro={(carbs * modalQuantity) / quantity}
                  color="text-yellow-400"
                />
              </div>
              <div className="flex items-end gap-4">
                Sugar:{' '}
                <MacroInfo
                  macro={(sugar * modalQuantity) / quantity}
                  color="text-fuchsia-400"
                />
              </div>
              <div className="flex items-end gap-4">
                Fats:{' '}
                <MacroInfo
                  macro={(fats * modalQuantity) / quantity}
                  color="text-purple-600"
                />
              </div>
              <div className="flex items-end gap-4">
                Saturated fats:{' '}
                <MacroInfo
                  macro={(saturated_fats * modalQuantity) / quantity}
                  color="text-pink-950"
                />
              </div>
              <div className="flex items-end gap-4">
                Protein:{' '}
                <MacroInfo
                  macro={(protein * modalQuantity) / quantity}
                  color="text-red-600"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <form action="" className="flex justify-between w-full pr-4">
                <label>
                  Quantity:{' '}
                  {isUserFood ? (
                    <input
                      type="number"
                      name="quantity"
                      className="form-input number-input w-32"
                      onChange={(e) => setModalQuantity(Number(e.target.value))}
                      defaultValue={quantity}
                    />
                  ) : (
                    <input
                      type="number"
                      value={quantity}
                      max={1000}
                      onChange={(e) =>
                        handleQuantityChange(Number(e.target.value))
                      }
                      className="form-input number-input w-32"
                    />
                  )}
                </label>
                {isUserFood ? (
                  <Button onClick={handleUpdate} color="success">
                    Update
                  </Button>
                ) : (
                  <Button onClick={handleAdd} color="success">
                    Add
                  </Button>
                )}
              </form>
            </ModalFooter>
          </Modal>
          <div className="-mt-4 flex flex-col lg:flex-row lg:gap-4">
            <Tooltip
              content="Calories per 100g"
              placement="bottom"
              className="w-40 text-center"
            >
              <MacroInfo macro={calories} color="text-green-700" />
            </Tooltip>
            <Tooltip
              content="Carbohydrates per 100g"
              placement="bottom"
              className="w-52 text-center"
            >
              <MacroInfo macro={carbs} color="text-yellow-400" />
            </Tooltip>
            <Tooltip
              content="Fats per 100g"
              placement="bottom"
              className="w-36 text-center"
            >
              <MacroInfo macro={fats} color="text-purple-600" />
            </Tooltip>
            <Tooltip
              content="Protein per 100g"
              placement="bottom"
              className="w-36 text-center"
            >
              <MacroInfo macro={protein} color="text-red-600" />
            </Tooltip>
          </div>
        </div>
        <div className="relative w-full flex flex-col items-center pt-2 gap-2">
          {isUserFood ? (
            <div className="space-y-4">
              <Button
                color="blue"
                size="xs"
                className="rounded-full"
                onClick={() => setOpenModal(true)}
              >
                <MdEdit className="text-2xl" />
              </Button>
              <Button
                color="failure"
                size="xs"
                className="rounded-full"
                onClick={handleDelete}
              >
                <MdDelete className="text-2xl" />
              </Button>
            </div>
          ) : (
            <>
              <div className="flex mr-3 gap-2">
                <Button
                  color="success"
                  className="rounded-full ml-8"
                  size="xs"
                  onClick={handleAdd}
                >
                  <MdAdd className="text-2xl" />
                </Button>
                {isCustomFood && (
                  <Button
                    color="failure"
                    className="rounded-full"
                    size="xs"
                    onClick={handleCustomFoodDelete}
                  >
                    <MdDelete className="text-2xl" />
                  </Button>
                )}
              </div>
              <div>
                <label>
                  Qty:{' '}
                  <input
                    key={isCustomFood ? food.id : food.foodId}
                    type="number"
                    onChange={(e) =>
                      handleQuantityChange(Number(e.target.value))
                    }
                    value={quantity}
                    max={1000}
                    className="form-input number-input max-w-24"
                  />
                </label>
                <span className="absolute right-3 bottom-3.5">g</span>
              </div>
            </>
          )}
        </div>
      </div>
      <hr className="h-0.5 bg-gray-300" />
      <div
        className={`fixed top-[90vh] left-[45vw] w-48 pl-10 py-2 rounded-xl text-white bg-red-500 ${
          showAlert ? 'scale-100 translate-y-0' : 'scale-0 -translate-y-8'
        } transition-transform z-50`}
      >
        <p>Food deleted!</p>
      </div>
    </div>
  );
}
