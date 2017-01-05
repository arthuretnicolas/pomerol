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
      email: contact.email
    }
  end
end
