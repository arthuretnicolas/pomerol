defmodule Pomerol.Repo.Migrations.CreateContactField do
  use Ecto.Migration

  def change do
    create table(:contact_fields, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :type, :string
      add :value, :string
      add :contact_id, references(:contacts, on_delete: :nothing, type: :binary_id), null: false
      timestamps
    end
  end
end
