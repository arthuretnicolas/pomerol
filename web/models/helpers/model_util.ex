defmodule Pomerol.ModelUtil do
  defmacro map_from(changeset, from, to: to, resolver: resolver) do
    quote do
      case unquote(changeset) do
        %Ecto.Changeset{changes: %{unquote(from) => value}} ->
          case unquote(resolver).(value) do
            nil -> add_error(unquote(changeset), :missing, "#{value} #{unquote(from)} is missing")
            model -> unquote(changeset) |> put_change(unquote(to), model.id)
          end
        _  -> unquote(changeset)
      end
    end
  end

  defmacro set_default_value_to(changeset, field: field, value: default_value) do
    quote do
      case unquote(changeset) do
        %Ecto.Changeset{changes: %{unquote(field) => current_value}} ->
          case current_value do
            nil -> unquote(changeset) |> put_change(unquote(field), unquote(default_value))
            _ -> unquote(changeset)
          end
        _  -> unquote(changeset) |> put_change(unquote(field), unquote(default_value))
      end
    end
  end
end
