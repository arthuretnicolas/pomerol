defmodule Pomerol.TestHelpers do
  use Phoenix.ConnTest
  import ExUnit.Assertions

  def ids_from_response(response) do
    Enum.map response, fn(attributes) ->
      attributes["id"]
    end
  end

  def assert_ids_from_response(response, ids) do
    assert ids_from_response(response) == ids
    response
  end

  def assert_result_id(result, id) do
    assert result["id"] == id
    result
  end
end
