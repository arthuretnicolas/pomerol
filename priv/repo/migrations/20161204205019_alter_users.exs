defmodule Pomerol.Repo.Migrations.AlterUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      modify :first_name, :string, null: true
      modify :last_name, :string, null: true
    end
  end
end
