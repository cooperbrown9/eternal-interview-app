import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from "baseui/modal";
import { KIND as ButtonKind, KIND } from "baseui/button";
import { logout } from "../api/auth";

const AccountModal = ({ user, isOpen, onClose }) => {
  const router = useHistory();

  async function onLogout() {
    await logout();
    router.push('/login')
  }

  function onEditAccount() {
    router.push('/profile/' + user._id + '/edit')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{user?.name}</ModalHeader>
      <ModalBody>
        <div class='flex flex-col'>
          <div>
            <p>Account Modal</p>
            
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={onClose} kind={KIND.tertiary}>
          Close
        </ModalButton>
        <ModalButton onClick={onEditAccount} kind={KIND.secondary}>
          Edit Account
        </ModalButton>
        <ModalButton onClick={onLogout}>Logout</ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export { AccountModal };
