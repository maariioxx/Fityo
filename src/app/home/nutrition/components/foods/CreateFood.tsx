'use client';

import {
  Button,
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'flowbite-react';
import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { createCustomFood } from '@/lib/actions';

export default function CreateFood() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="pt-0.5">
      <Tooltip content="Create custom food">
        <Button color="success" size="sm" onClick={() => setOpenModal(true)}>
          <MdAdd className="text-2xl" />
        </Button>
      </Tooltip>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Create a custom food</ModalHeader>
        <form action={createCustomFood}>
          <ModalBody className="grid grid-cols-2 gap-4">
            <label className="flex flex-col">
              Name:
              <input
                type="text"
                name="name"
                className="form-input max-w-64"
                required
              />
            </label>
            <label className="flex flex-col">
              Quantity:
              <input
                type="number"
                name="quantity"
                className="form-input max-w-64 number-input"
                required
              />
            </label>
            <label className="flex flex-col">
              Calories:
              <input
                type="number"
                name="calories"
                className="form-input max-w-64 number-input"
                required
              />
            </label>
            <label className="flex flex-col">
              Carbohydrates:
              <input
                type="number"
                name="carbohydrates"
                className="form-input max-w-64 number-input"
                required
              />
            </label>
            <label className="flex flex-col">
              Sugar:
              <input
                type="number"
                name="sugar"
                className="form-input max-w-64 number-input"
                required
              />
            </label>
            <label className="flex flex-col">
              Fats:
              <input
                type="number"
                name="fats"
                className="form-input max-w-64 number-input"
                required
              />
            </label>
            <label className="flex flex-col">
              Saturated fats:
              <input
                type="number"
                name="saturated_fats"
                className="form-input max-w-64 number-input"
                required
              />
            </label>
            <label className="flex flex-col">
              Protein:
              <input
                type="number"
                name="protein"
                className="form-input max-w-64 number-input"
                required
              />
            </label>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              type="submit"
              onClick={() => setOpenModal(false)}
            >
              <MdAdd className="text-2xl" />
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
