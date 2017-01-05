defmodule Pomerol.Repo.Migrations.CreateContactAddress do
  use Ecto.Migration

  def change do
    create table(:contact_addresses, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :type, :string
      add :address1, :string
      add :address2, :string
      add :city, :string
      add :zip, :string
      add :state, :string
      add :country_id, references(:countries, on_delete: :nothing, type: :binary_id), null: false
      add :contact_id, references(:contacts, on_delete: :nothing, type: :binary_id), null: false
      timestamps
    end
  end
end
