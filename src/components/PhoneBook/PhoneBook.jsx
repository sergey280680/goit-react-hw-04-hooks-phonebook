import { useState, useEffect } from "react";
import { FormTextInput } from "components/PhoneBook/FormTextInput/FormTextInput";
import { ContainerPhoneBook, Span } from "./PhoneBook.styled";
import { ListContacts } from "components/PhoneBook/ListContacts/ListContacts";
import { Search } from "components/PhoneBook/Search/Search";
import shortid from "shortid";

export function PhoneBook({ title, titleContacts }) {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem("contacts")) ?? []
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addName = (data) => {
    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    const allContacts = contacts;
    for (const name of allContacts) {
      const names = name.name;

      if (names === contact.name) {
        return alert(`${contact.name} is already in contacts`);
      }
    }

    setContacts([...contacts, contact]);
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const resetSearch = () => {
    setFilter("");
  };

  const deliteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  // фильтрация контактов не чуствительная к регистру
  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <ContainerPhoneBook>
      <h1>{title}</h1>
      <FormTextInput onSubmit={addName} />
      <h2>{titleContacts}</h2>

      {contacts.length === 0 ? (
        <h3>you have no contacts yet</h3>
      ) : (
        <>
          <Search
            value={filter}
            onChange={changeFilter}
            onReset={resetSearch}
          />
          {filteredContacts.length === 0 ? (
            <h3>
              you do not have contacts with the name <Span>{filter}</Span>
            </h3>
          ) : (
            <ListContacts
              events={filteredContacts}
              onDeliteContact={deliteContact}
            />
          )}
        </>
      )}
    </ContainerPhoneBook>
  );
}
// ========================
