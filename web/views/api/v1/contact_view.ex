defmodule Pomerol.ContactView do
  use Pomerol.Web, :view

  def render("index.json", %{contacts: contacts}) do
    %{
      contacts: render_many(contacts, __MODULE__, "contact.json", as: :contact)
    }
  end

  def render("contact.json", %{contact: contact}) do
    %{
      id: contact.id,
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      user_id: contact.user.id,
      organization_id: contact.organization.id,
      quotes: render_many(contact.quotes, Pomerol.QuoteView, "quote.json"),
      company: render_one(contact.company, Pomerol.ContactCompanyView, "contact_company.json"),
      addresses: render_many(contact.addresses, Pomerol.ContactAddressView, "contact_address.json"),
      fields: render_many(contact.fields, Pomerol.ContactFieldView, "contact_field.json"),
      inserted_at: contact.inserted_at,
      updated_at: contact.updated_at,
      archived: contact.archived,
      contact_type: contact.contact_type
    }
  end
end
