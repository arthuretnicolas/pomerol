defmodule Pomerol.Repo.Migrations.CreateContact do
  use Ecto.Migration

  def change do
    create table(:contacts, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :first_name, :string
      add :last_name, :string
      add :email, :string
      add :contact_type, :string, null: false
      add :address1, :string
      add :address2, :string
      add :city, :string
      add :zip, :string
      add :state, :string
      add :country_id, references(:countries, on_delete: :nothing, type: :binary_id)
      add :user_id, references(:users, on_delete: :nothing, type: :binary_id), null: false
      add :organization_id, references(:organizations, on_delete: :nothing, type: :binary_id), null: false
      timestamps
    end

    create index(:contacts, [:organization_id])
    create index(:contacts, [:user_id])
  end
end
