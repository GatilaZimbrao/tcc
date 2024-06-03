import { AdminOnly } from "../../../shared/utils/IsAdmin";
import { formatTel } from "../../../shared/utils/formatTel";
import { useContactContext } from "../context/ContactProvider";
import { UpdateContact } from "./UpdateContact";

const ContactTable = () => {
  const { contacts } = useContactContext();

  return (
    <div className="overflow-x-auto sm:rounded-lg p-4 w-full text-gray-500">
      <div className="mb-4 mt-2 gap-4 flex flex-col justify-center items-center">
        {contacts.map((contact, index) => {
          return (
            <div
              className="py-4 px-28 text-center mb-4 relative"
              key={`contact-${index}`}
            >
              <div className="text-2xl font-medium">{contact.name}</div>
              <div className="text-lg font-normal mt-2">{contact.email}</div>
              <div className="text-lg font-normal mt-2">
                {formatTel(contact.tel)}
              </div>
              <div className="absolute right-0 top-2">
                <AdminOnly>
                  <UpdateContact contact={contact} />
                </AdminOnly>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { ContactTable };
