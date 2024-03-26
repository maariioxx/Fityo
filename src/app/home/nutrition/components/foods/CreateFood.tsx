'use client';

import {
  Button,
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { createCustomFood } from '@/lib/actions';
import { TCreateFoodSchema, createFoodSchema } from '@/types/forms/createfood';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function CreateFood() {
  const { register, handleSubmit } = useForm<TCreateFoodSchema>({
    resolver: zodResolver(createFoodSchema),
  });
  const [openModal, setOpenModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleCreateFood = async (data: TCreateFoodSchema) => {
    const res = await createCustomFood(data);
    if (res) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  return (
    <div className="pt-0.5 relative">
      <Tooltip content="Create custom food">
        <Button color="success" size="sm" onClick={() => setOpenModal(true)}>
          <MdAdd className="text-2xl" />
        </Button>
      </Tooltip>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Create a custom food</ModalHeader>
        <form onSubmit={handleSubmit(handleCreateFood)}>
          <ModalBody className="grid grid-cols-2 gap-4">
            <label className="flex flex-col">
              Name:
              <input
                {...register('name')}
                type="text"
                className="form-input max-w-64"
                required
              />
            </label>
            <label className="flex flex-col">
              Quantity:
              <input
                {...register('quantity')}
                type="number"
                name="quantity"
                className="form-input max-w-64 number-input"
                required
              />
            </label>
            <label className="flex flex-col">
              Calories:
              <input
                {...register('calories')}
                type="number"
                className="form-input max-w-64 number-input"
                required
              />
            </label>
            <label className="flex flex-col">
              Carbohydrates:
              <input
                {...register('carbohydrates')}
                type="number"
                className="form-input max-w-64 number-input"
                required
              />
            </label>
            <label className="flex flex-col">
              Sugar:
              <input
                {...register('sugar')}
                type="number"
                className="form-input max-w-64 number-input"
                required
              />
            </label>
            <label className="flex flex-col">
              Fats:
              <input
                {...register('fats')}
                type="number"
                className="form-input max-w-64 number-input"
                required
              />
            </label>
            <label className="flex flex-col">
              Saturated fats:
              <input
                {...register('saturated_fats')}
                type="number"
                className="form-input max-w-64 number-input"
                required
              />
            </label>
            <label className="flex flex-col">
              Protein:
              <input
                {...register('protein')}
                type="number"
                className="form-input max-w-64 number-input"
                required
              />
            </label>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              type="submit"
              onClick={() => setTimeout(() => setOpenModal(false), 1000)}
            >
              <MdAdd className="text-2xl" />
            </Button>
          </ModalFooter>
        </form>
      </Modal>
      <div
        className={`fixed top-[90vh] left-[45vw] w-48 pl-10 py-2 rounded-xl text-white bg-green-700 ${
          showAlert ? 'scale-100 translate-y-0' : 'scale-0 -translate-y-8'
        } transition-transform z-50`}
      >
        <p>Food created!</p>
      </div>
    </div>
  );
}
