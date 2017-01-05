defmodule Pomerol.Repo.Migrations.AddTimezoneToUser do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :timezone, :string
    end
  end
end
