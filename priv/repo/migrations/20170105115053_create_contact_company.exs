defmodule Pomerol.Repo.Migrations.CreateContactCompany do
  use Ecto.Migration

  def change do
    create table(:contact_companies, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      timestamps
    end
  end
end
